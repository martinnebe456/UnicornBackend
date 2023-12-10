"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/share-error.js");

const WARNINGS = {
  CreateShare: {
    UnsupportedKeys: {
      code: `${Errors.CreateShare.UC_CODE}unsupportedKeys`,
    },
  },
};

class ShareAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("share");
  }

  async createShare(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("listShareCreateShareDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.CreateShare.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    dtoIn.uuAppErrorMap = uuAppErrorMap;
    return dtoIn;
  }

}

module.exports = new ShareAbl();
