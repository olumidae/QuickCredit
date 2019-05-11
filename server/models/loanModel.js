
class Loans {
  constructor() {
    this.loans = [];
  }

  applyForLoan(info) {
    const newLoan = {
      id: this.loans.length + 1,
      user: info.user,
      createdOn: new Date().toString('dd/MM/yyyy'),
      status: 'pending',
      repaid: false,
      tenor: parseFloat(info.tenor),
      amount: parseFloat(info.amount),
      interest: parseFloat(info.amount) * 5 / 100,
      paymentInstallment: parseFloat(info.interest) / parseFloat(info.tenor),
      balance: parseFloat(info.amount) + (parseFloat(info.amount) * 5 / 100),
    };
    this.loans.push(newLoan);
    return newLoan;
  }
}

export default new Loans();
