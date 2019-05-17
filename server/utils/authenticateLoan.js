import jo from 'joi';


const applyValidator = (loan) => {
  const applyFormat = {
    firstName: jo.string().required(),
    lastName: jo.string().required(),
    address: jo.string().required(),
    email: jo.string().email().required(), /** .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(), */
    tenor: jo.number().max(12).required(),
    amount: jo.number().required(),
    status: jo.string().valid('pending', 'approved', 'rejected'),
    repaid: jo.boolean().valid('true', 'false'),
    interest: jo.number(),
    paymentInstallment: jo.number(),
    balance: jo.number(),
  };
  return jo.validate(loan, applyFormat);
};

const approveValidator = (loan) => {
  const approveFormat = {
    status: jo.string().valid('pending', 'approved', 'rejected').required(),
    approvedBy: jo.string(),
  };
  return jo.validate(loan, approveFormat);
};

export default {
  applyValidator,
  approveValidator,
};