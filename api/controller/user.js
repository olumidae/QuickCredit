import UserService from '../services/loanService';
import ResponseHelper from '../helper/response';
import errors from '../helper/errors';

class UserController {
  static async createLoan(req, res) {
    const { id } = req.user;
    try {
      const user = await UserService.findUserData(id);
      const checkLoan = await UserService.checkExistingLoan(id);
      if (!checkLoan) {
        const createLoan = await UserService.createLoan(user, req.body);
        if (!createLoan) return ResponseHelper.setError(res, 500, errors.serverError);
        const data = UserController.loanResponse(createLoan, user);
        return ResponseHelper.setSuccess(res, 201, data);
      }
      if (checkLoan.repaid === false) {
        return ResponseHelper.setError(res, 400, errors.alreadyExists);
      }
    } catch (error) {
      return ResponseHelper.setError(res, 500, errors.serverError);
    }
  }

  static loanResponse(loan, user) {
    const { firstName, lastName, email } = user;
    const newData = {
      loanId: loan.id,
      firstName,
      lastName,
      email,
      amount: loan.amount,
      tenor: loan.tenor,
      status: loan.status,
      monthlyInstallment: loan.payableInstallment,
      balance: loan.balance,
      interest: loan.balance,
    };
    return newData;
  }
}

export default UserController;
