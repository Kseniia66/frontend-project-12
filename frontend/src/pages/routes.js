const apiPath = '/api/v1';

export default {
  chatPage: () => '/',
  loginPage: () => '/login',
  loginApi: () => [apiPath, 'login'].join('/'),
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
};
