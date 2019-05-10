const validateUser = (req, res, next) => {
  const { firstname, lastname, email, password, password2 } = req.body;
  const errors = [];
  let messasge = '';

  // check required fields
  if (!firstname || !lastname || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // check pass length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.status(400).json({ status: 400, error: messasge });
  } else {
    next();
  }
};

export default validateUser;
