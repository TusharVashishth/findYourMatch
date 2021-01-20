const validator = require("validator")

const profileValidator = (data) => {
  let errors = {}
  // if (validator.isEmpty(data.age)) {
  //   errors.age = "Age field is required."
  // } else if (!validator.isLength(data.age, { min: 2, max: 3 })) {
  //   errors.age = "Age must be 2 or 3 digit."
  // }

  if (validator.isEmpty(data.country)) {
    errors.country = "Country field is required."
  }

  if (validator.isEmpty(data.state)) {
    errors.state = "State field is required."
  }

  if (validator.isEmpty(data.city)) {
    errors.city = "City field is required."
  }
  if (validator.isEmpty(data.maritalStatus)) {
    errors.maritalStatus = "Marital status field is required."
  }

  if (validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required."
  }

  return {
    errors,
  }
}

module.exports = profileValidator
