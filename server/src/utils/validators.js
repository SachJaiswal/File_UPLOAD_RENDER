const { body } = require('express-validator');

const validateUser = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .trim(),
  
  body('surname')
    .notEmpty().withMessage('Surname is required')
    .isString().withMessage('Surname must be a string')
    .trim(),
  
  body('dob')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().withMessage('Invalid date format')
    .toDate(),
  
  body('address')
    .notEmpty().withMessage('Address is required')
    .isString().withMessage('Address must be a string')
    .trim(),
  
  body('state')
    .notEmpty().withMessage('State is required')
    .isString().withMessage('State must be a string')
    .trim(),
  
  body('country')
    .notEmpty().withMessage('Country is required')
    .isString().withMessage('Country must be a string')
    .trim(),
  
  body('birthplace')
    .notEmpty().withMessage('Birthplace is required')
    .isString().withMessage('Birthplace must be a string')
    .trim(),
];

module.exports = { validateUser };