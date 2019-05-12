import webtoken from 'jsonwebtoken';
import config from '../config/config.json';
import userModel from '../models/userModel';
import loanModel from '../models/loanModel';
import authenticateLoan from '../utils/authenticateLoan';


const loanController = {
  getAllLoans: (req, res) => {
    if (!loanModel.loans.length) {
      return res.status(404).json({ status: 404, error: 'No loan(s) found' });
    }
    return res.status(200).json({ status: 200, data: loanModel.loans });
  },


  applyForLoan: (req, res) => {
    // Validating
    const { error } = authenticateLoan.applyValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }

    const isloggedin = userModel.UserData.find(user => user.email === req.body.user && user.isLoggedIn === 'true' && user.isAdmin === 'false');
    if (!isloggedin) return res.status(400).json({ status: 400, error: 'You must  be logged in to request a loan' });

    const isVerified = userModel.UserData.find(user => user.email === req.body.user && user.status === 'verified');
    if (!isVerified) return res.status(400).json({ status: 400, error: 'You are not allowed to request a loan, your account is not verified' });

    let newloan = loanModel.loans.find(loan => loan.user === req.body.user && loan.repaid !== 'true');

    if (newloan) {
      return res.status(400).json({ status: 400, error: 'Dear client, you have an unrepaid loan!' });
    }

    newloan = loanModel.applyForLoan(req.body);
    const token = webtoken.sign({ sub: newloan.id }, config.secret);
    res.status(201).json({ status: 201, message: 'The loan request was successfull', data: newloan, token });
  },

  loansListByStatus: (req, res) => {

    const verifyLoan = loanModel.loans.find(loan => loan.status === req.params.status);

    if (!verifyLoan) {
      return res.status(404).json({ status: 404, error: `No ${req.params.status} loan(s) found` });
    }

    return res.status(200).json({ status: 200, data: verifyLoan });
  },

  approveLoan: (req, res) => {

    // validate data
    const { error } = authenticateLoan.approveValidator(req.body);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }

    const isloggedAsAdmin = userModel.users.find(user => user.email === req.body.approvedBy && user.isLoggedIn === 'true' && user.isAdmin === 'true');
    if (!isloggedAsAdmin) {
      return res.status(400).json({ status: 400, error: 'You are not allowed to approve the loan request. Log in as Admin' });
    }

    let pendingLoan = loanModel.loans.find(l => l.user === req.params.user && l.status === 'pending');
    if (!pendingLoan) return res.status(404).json({ status: 404, error: 'The are no pending loan requests' });

    pendingLoan.status = req.body.status;

    // return update

    pendingLoan = loanModel.loans.find(loan => loan.user === req.params.user);

    const token = webtoken.sign({ sub: pendingLoan.id }, config.secret);
    res.status(200).json({ status: 200, message: 'User marked as verified', data: pendingLoan, token });
  },

  getSpecificLoan: (req, res) => {
    const getLoanById = loanModel.loans.find(loan => loan.loanId === req.params.loanId);

    if (!getLoanById) {
      return res.status(404).json({ status: 404, error: 'Loan does not exist' });
    }

    return res.status(200).json({ status: 200, data: getLoanById });
  },

};
export default loanController;
