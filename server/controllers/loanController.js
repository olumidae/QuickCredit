import webtoken from 'jsonwebtoken';
import config from '../config/config.json';
import userModel from '../models/userModel';
import loanModel from '../models/loanModel';
import autheticateLoan from '../utils/authenticateLoan';

const loanController = {
  getAllLoans: (req, res) => {
    if (!loanModel.loans.length) {
      return res.status(404).json({ status: 404, error: 'No loan(s) found' });
    }
    return res.status(200).json({ status: 200, data: loanModel.loans });
  },


  applyForLoan: (req, res) => {
    // Validating
    const { error } = autheticateLoan.applyValidator(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message.slice(0, 70) });
    }

    const isloggedin = userModel.UserData.find(u => u.email === req.body.user && u.isLoggedIn === 'true' && u.isloan === 'false');
    if (!isloggedin) return res.status(400).json({ status: 400, error: 'You must  be logged in to request a loan' });

    const isVerified = userModel.UserData.find(u => u.email === req.body.user && u.status === 'verified');
    if (!isVerified) return res.status(400).json({ status: 400, error: 'You are not allowed to request a loan, your account is not verified' });

    let newloan = loanModel.loans.find(loan => loan.user === req.body.user && loan.repaid !== 'true');

    if (newloan) {
      return res.status(400).json({ status: 400, error: 'Dear client, you have an unrepaid loan !!' });
    }

    newloan = loanModel.applyForLoan(req.body);
    const token = webtoken.sign({ sub: newloan.id }, config.secret);
    res.status(201).json({ status: 201, message: 'The loan was successfully requested', data: newloan, token });
  },


};
export default loanController;
