
class Loans {
  constructor() {
    this.loans = [];
  }

  applyForLoan(info) {
    const interest = parseFloat(info.amount) * 0.05;
    const balance = parseFloat(info.amount) + interest;
    const newLoan = {
      id: this.loans.length + 1,
      user: info.user,
      createdOn: new Date().toString(),
      status: 'pending',
      repaid: false,
      tenor: parseFloat(info.tenor),
      amount: parseFloat(info.amount),
      interest,
      paymentInstallment: balance / parseFloat(info.tenor),
      balance,
    };
    this.loans.push(newLoan);
    return newLoan;
  }
}

export default new Loans();
