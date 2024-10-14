const HttpStatus = require("../utils/httpStatusCodes");

const ResponseFormatService = {
  responseOk(data, message, isAuthorized) {
    return {
      statusCode: HttpStatus.OK,
      wasSuccess: true,
      message: message,
      isAuthorized: isAuthorized,
      response: data,
      error: false,
    };
  },

  responseNotFound(data, message, isAuthorized) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      wasSuccess: false,
      message: message,
      response: data,
      isAuthorized: isAuthorized,
      error: true,
    };
  },

  responseUnprocessableEntity(data, message, isAuthorized) {
    return {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      wasSuccess: false,
      message: message,
      response: data,
      isAuthorized: isAuthorized,
      error: true,
    };
  },
  responseBadRequest(data, message, isAuthorized) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      wasSuccess: false,
      message: message,
      response: data,
      isAuthorized: isAuthorized,
      error: true,
    };
  },
  responseUnauthorized(data, message, isAuthorized) {
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      wasSuccess: false,
      message: message,
      response: data,
      isAuthorized: isAuthorized,
      error: true,
    };
  },
  responseForbidden(data, message, isAuthorized) {
    return {
      statusCode: HttpStatus.FORBIDDEN,
      wasSuccess: false,
      message: message,
      response: data,
      isAuthorized: isAuthorized,
      error: true,
    };
  },
  responseInternalServer(data, message, isAuthorized) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER,
      wasSuccess: false,
      message: message,
      response: data,
      isAuthorized: isAuthorized,
      error: true,
    };
  },
};

module.exports = ResponseFormatService;
