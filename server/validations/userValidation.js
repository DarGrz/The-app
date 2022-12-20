// Validation for registering user

import * as yup from "yup";

const userSchemaVal = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(46).required(),
});

export default userSchemaVal;
