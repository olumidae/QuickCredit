[![Build Status](https://travis-ci.org/olumidae/QuickCredit.svg?branch=develop)](https://travis-ci.org/olumidae/QuickCredit)
[![Maintainability](https://api.codeclimate.com/v1/badges/e6ecc73f579dfa83767e/maintainability)](https://codeclimate.com/github/olumidae/QuickCredit/maintainability)
# QuickCredit
Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

# Features
A User can sign up
A User can sign in
A User can apply for only one at a time 
A User can view loan repayment history
Admin can mark a client as verified , after confirming his/her home and work address
Admin can view a specific loan application
Admin can approve or reject a client’s loan application
Admin can post loan repayment transaction in favour of a client
Admin can view all loan applications
Admin can view all current loans (not fully repaid)
Admin can view all repaid loans

#Technologies
#### Frontend:
. JavaScript
. HTML
. CSS

#### Backend:
. Node JS
. Babel
. Express
. Babel
. Mocha & Chai
. ESLint
. Joi
. Moment
. Jwt
. Bcrypt


# Installation
To install and run the project you need to do the following: 
Clone the repository: git clone https://github.com/olumidae/QuickCredit.git
Change directory into Quick Credit folder: cd QuickCredit
Install all dependencies: npm install
Start the server: npm start
Navigate to localhost: 5000/api/v1 in your browser to view the running application

# Testing
To run unit tests use: npm test in the command line terminal
Install Postman and navigate localhost:5000/api/v1/ to test API endpoints

# API Endpoint
- POST /api/v1/auth/signup Create user account

- POST /api/v1/auth/signin Login a user

- GET /api/v1/user Get all user

- GET /api/v1/user/:id Get a user

- PATCH /api/v1/user/:id Update a user

- POST /api/v1/loans Create a loan application

- GET /api/v1/loans/loan-id/repayment View loan repayment history

- GET /api/v1/loans Get all loan applications

- GET /api/v1/loans?status=approved&repaid=false (Get all current loans that are not fully repaid)

- GET /api/v1/loans?status=approved&repaid=true (Get all repaid loans.)

- PATCH /api/v1/users/:user-email/verify Mark a user as verified

- GET /api/v1/loans/:loan-umidae.github.io/QuickCredit/ui/id Get a specific loan application

- PATCH /api/v1/loans/:loan-id Approve or reject a loan application

- POST /api/v1/loans/:loan-id/repayment Create a loan repayment record



## Deployment

This website was deployed on [heroku.com](#).

This website was deployed on [Github pages](https://olumidae.github.io/QuickCredit/ui/)


# Author
### Olumide Omitiran