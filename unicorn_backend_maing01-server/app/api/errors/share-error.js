"use strict";

const BackendMainUseCaseError = require("./backend-main-use-case-error.js");
const SHARE_ERROR_PREFIX = `${BackendMainUseCaseError.ERROR_PREFIX}share/`;

const CreateShare = {
  UC_CODE: `${SHARE_ERROR_PREFIX}createShare/`,
  
};

module.exports = {
  CreateShare
};
