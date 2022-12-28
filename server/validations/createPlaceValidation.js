// Validation for registering user

import * as yup from "yup";

const createPlaceSchemaValidation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
  about: yup.string().required(),
  playersNum: yup.string().required(),
  reservePlayersNum: yup.string(),
});

export default createPlaceSchemaValidation;
