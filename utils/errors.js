const ERROR_CODES = {
  BAD_REQUEST: 400,
  BAD_REQUEST_MESSAGE: "Request to the server failed.",
  INVALID_PERM: 403,
  INVALID_PERM_MESSAGE: "User does not have permission to edit this item.",
  NOT_FOUND: 404,
  NOT_FOUND_MESSAGE: "User not found.",
  SERVER_ERROR: 500,
  SERVER_ERROR_MESSAGE: "An error has occured on the server.",
};

module.exports = {
  ERROR_CODES,
};
