exports.responseFormat = (
  message,
  results,
  isAuthorized,
  error,
  statusCode
) => {
  return {
    message,
    statusCode: statusCode,
    // statusCode: 401 || 200 || 404,
    error: error,
    isAuthorized: isAuthorized,
    data: results || null,
  };
};
