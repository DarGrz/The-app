// Validation for registering user

import * as yup from "yup";

const createPlaceSchemaValidation = yup.object().shape({
  name: yup.string().required(),
  address: yup.string(),
});

export default createPlaceSchemaValidation;
