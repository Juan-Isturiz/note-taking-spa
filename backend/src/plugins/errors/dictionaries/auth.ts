export const authErrors = {
  'invalid-credentials': {
    status: 401,
    type: 'AUTH_ERROR',
    title: 'Invalid credentials',
    message: 'Invalid email or password',
  },
  'invalid-token': {
    status: 401,
    type: 'AUTH_ERROR',
    title: 'Invalid token',
    message: 'Invalid token',
  },
  'email-already-exists': {
    status: 409,
    type: 'AUTH_ERROR',
    title: 'Email already exists',
    message: 'The email address already exists',
  },
  unauthorized: {
    status: 401,
    type: 'AUTH_ERROR',
    title: 'Unauthorized',
    message: 'Unauthorized',
  },
};
