const showDiv = () => {
  document.getElementById('loan-form').style.display = 'block';
  document.getElementById('table').style.display = 'none';
};

const showLoanHistory = () => {
  document.getElementById('table').style.display = 'block';
  document.getElementById('loan-form').style.display = 'none';
};
