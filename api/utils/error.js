// We will be defining custom error in this file

export const errorHandler = (customCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
