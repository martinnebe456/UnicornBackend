"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/item-error.js");

const WARNINGS = {
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },
  UpdateState: {
    UnsupportedKeys: {
      code: `${Errors.UpdateState.UC_CODE}unsupportedKeys`,
    },
  },
};

class ItemAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("item");
  }

  async list(awid, dtoIn) {
    
  }

  async updateState(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListItemUpdateStateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.UpdateState.UnsupportedKeys.code,
      Errors.UpdateState.InvalidDtoIn
    );
    dtoIn.uuAppErrorMap = uuAppErrorMap;
    return dtoIn;
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListItemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    dtoIn.uuAppErrorMap = uuAppErrorMap;

    const shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Error("Shopping list not found.");
    }
  
    await this.dao.delete(awid, dtoIn.id);
  
    return dtoIn;
  }

  async create(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListItemCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
      const item = dtoIn;
      item.awid = awid;

      let outputObject = {};
      try {
        outputObject = this.dao.create(item);
      } catch(e) {
        throw new Errors.Create.ItemDaoCreateFailed({ uuAppErrorMap }, e);
      }
      return outputObject;
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListItemGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    const result = await this.dao.get(awid, dtoIn);

    if (!result) {
      throw new Errors.Get.ItemNotFound({ uuAppErrorMap });
    }
    return {
      ...result,
      uuAppErrorMap
    };;
  }

}

module.exports = new ItemAbl();
