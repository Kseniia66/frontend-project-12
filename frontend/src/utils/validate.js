import { object, string, ref } from 'yup';

export const channelSchema = (t, existingNames = []) => object().shape({
  name: string()
    .trim()
    .min(3, t('schema.minMax'))
    .max(20, t('schema.minMax'))
    .required(t('schema.required'))
    .notOneOf(existingNames, 'Канал с таким именем уже существует')
});

const signupSchema = (t) => object().shape({
  username: string()
    .trim()
    .min(3, t('schema.minMax'))
    .max(20, t('schema.minMax'))
    .required(t('schema.required')),
  password: string()
    .trim()
    .min(6, t('schema.minSymbolForPassword'))
    .required(t('schema.required')),
  confirmPassword: string()
    .required(t('schema.required'))
    .oneOf([ref('password')], t('signup.passwordMatch'))
});

export default signupSchema;
