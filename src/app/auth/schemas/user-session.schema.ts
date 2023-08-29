import * as yup from 'yup';

export const UserSessionSchema = yup.object({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
  role_id: yup.string().uuid().required(),
  role_type: yup.string().required(),
  permissions: yup.array(yup.string().required()).required(),
  iat: yup.number().required(),
  exp: yup.number().required(),
});
