
class Loans {
  constructor() {
    this.loans = [];
  }

  applyForLoan(info) {
    const interest = parseFloat(info.amount) * 5 / 100;

    const newLoan = {
      id: this.loans.length + 1,
      user: info.user,
      createdOn: new Date().toString(),
      status: 'pending',
      repaid: 'false',
      tenor: parseFloat(info.tenor),
      amount: parseFloat(info.amount),
      interest,
      paymentInstallment: interest / parseFloat(info.tenor),
      balance: parseFloat(info.amount) + (parseFloat(info.amount) * 5 / 100),
    };
    this.loans.push(newLoan);
    return newLoan;
  }
}

export default new Loans();
