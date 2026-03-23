export const defaultErrors = {
  default: {
    status: 400,
    type: 'SERVER_ERROR',
    title: 'Internal server error',
    message: 'Internal server error',
  },
  'not-found': {
    status: 404,
    type: 'NOT_FOUND_ERROR',
    title: 'Not found',
    message: 'The resource you are looking for was not found',
  },
};
