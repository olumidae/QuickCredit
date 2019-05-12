import jo from 'joi';

const repaymentValidator = (amount) => {
  const repayFormat = {
    loanId: jo.number().required(),
    amount: jo.number().required(),
    dateCreated: jo.date().required(),
  };
  return jo.validate(amount, repayFormat);
};

export default repaymentValidator;
