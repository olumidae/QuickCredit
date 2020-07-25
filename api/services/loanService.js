import db from '../models';

const { Loans, Users } = db;

/**
 * @fileoverview handles users functionalites
*/

class UserService {
  static async createLoan(user, body) {
    const { id } = user;
    const { amount, tenor } = body;
    const rate = parseInt('5');
    const parsedTenor = parseInt(tenor, 10);
    const parsedAmount = parseFloat(amount);
    const interest = parseFloat((rate / 100) * parsedAmount);
    const payableInstallment = parseFloat((amount / tenor));
    const balance = parsedAmount;

    const response = await Loans.create({
      UserId: id,
      amount: parsedAmount,
      tenor: parsedTenor,
      payableInstallment,
      interest,
      balance,
    });
    return response;
  }

  static async checkExistingLoan(id) {
    const response = await Loans.findOne({
      where: {
        UserId: id,
      },
    });
    return response;
  }

  static async findUserData(id) {
    const response = await Users.findOne({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      where: { id },
    });
    return response;
  }
}

export default UserService;
