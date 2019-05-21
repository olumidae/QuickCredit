import webtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel';
import loanModel from '../models/loanModel';
import authenticateLoan from '../utils/authenticateLoan';

dotenv.config();
const { secret } = process.env;

const loanController = {
  getAllLoans: (req, res) => {
    if (!loanModel.loans.length) {
      return res.status(404).json({ status: 404, error: 'No loan found' });
    }

    const { status, repaid } = req.query;
    if (status === 'approved' && repaid === 'false') {
      const unpaidLoans = loanModel.loans.filter(unpaid => unpaid.status === 'approved' && unpaid.repaid === 'false');
      if (unpaidLoans.length > 0) {
        return res.status(200).json({ status: 200, data: unpaidLoans });
      }
      return res.status(404).json({ status: 404, message: 'there are no unpaid loans' });
    }

    if (status === 'approved' && repaid === 'true') {
      const repaidLoan = loanModel.loans.filter(paid => paid.status === 'aprroved' && paid.repaid === 'true');
      return res.status(200).json({ status: 200, data: repaidLoan });
    }

    return res.status(200).json({ status: 200, data: loanModel.loans });
  },


  applyForLoan: (req, res) => {
    // Validating
    const { error } = authenticateLoan.applyValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
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
    // const token = webtoken.sign({ sub: newloan.id }, config.secret);
    return res.status(201).json({
      status: 201, message: 'The loan request was successful', data: newloan, /** token */
    });
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
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }

    // const isloggedAsAdmin = userModel.users.find(user => user.email === req.body.approvedBy && user.isLoggedIn === 'true' && user.isAdmin === 'true');
    // if (!isloggedAsAdmin) {
    //   return res.status(400).json({ status: 400, error: 'You are not allowed to approve the loan request. Log in as Admin' });
    // }

    let pendingLoan = loanModel.loans.find(loan => loan.user === req.params.user && loan.status === 'pending');
    if (!pendingLoan) return res.status(404).json({ status: 404, error: 'The are no pending loan requests' });

    pendingLoan.status = req.body.status;

    // return update

    pendingLoan = loanModel.loans.find(loan => loan.user === req.params.user);

    const token = webtoken.sign({ sub: pendingLoan.id }, secret);
    return res.status(200).json({ status: 200, message: 'User marked as verified', data: pendingLoan, token,
    });
  },

  getSpecificLoan: (req, res) => {
    const { id } = req.params;
    const getLoanById = loanModel.loans.find(loan => loan.id === Number(id));

    if (!getLoanById) {
      return res.status(404).json({ status: 404, error: 'Loan does not exist' });
    }

    return res.status(200).json({ status: 200, data: getLoanById });
  },

};
export default loanController;
