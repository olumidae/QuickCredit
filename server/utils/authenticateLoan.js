import jo from 'joi';


const applyValidator = (loan) => {
  const applyFormat = {
    firstName: jo.string().required(),
    lastName: jo.string().required(),
    address: jo.string().required(),
    email: jo.string().email().required().label('Email is required'),
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
