const ERROR_CODES = {
  BAD_REQUEST: 400,
  BAD_REQUEST_MESSAGE: "Request to the server failed.",
  UNAUTH_ERROR: 401,
  UNAUTH_ERROR_MESSAGE: "Authorization required.",
  INVALID_PERM: 403,
  INVALID_PERM_MESSAGE: "User does not have permission to edit this item.",
  NOT_FOUND: 404,
  NOT_FOUND_MESSAGE: "User not found.",
  CONFLICT_ERROR: 409,
  CONFLICT_ERROR_MESSAGE: "User with this email already exists.",
  SERVER_ERROR: 500,
  SERVER_ERROR_MESSAGE: "An error has occured on the server.",
};

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
