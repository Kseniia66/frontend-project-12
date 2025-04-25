const apiPath = '/api/v1';

export default {
  chatPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
  loginApi: () => [apiPath, 'login'].join('/'),
  sighUpPath: () => [apiPath, 'signup'].join('/'),
};
