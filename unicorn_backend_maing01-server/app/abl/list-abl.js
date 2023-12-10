"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/list-error.js");

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
  UpdateArchive: {
    UnsupportedKeys: {
      code: `${Errors.UpdateArchive.UC_CODE}unsupportedKeys`,
    },
  },
  UpdateShare: {
    UnsupportedKeys: {
      code: `${Errors.UpdateShare.UC_CODE}unsupportedKeys`,
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  }
};


class ListAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("list");
  }

/**
 * Updates a shopping list.
 * @param {string} awid - The unique identifier of the application workspace.
 * @param {object} dtoIn - The data transfer object containing the updated shopping list information.
 * @returns {object} - The updated shopping list object along with any validation errors.
 */
async update(awid, dtoIn) {
  // Initialize the error map
  let uuAppErrorMap = {};

  // Validate the input data
  const validationResult = this.validator.validate("shoppingListsUpdateDtoInType", dtoIn);

  // Process the validation result and update the error map with any validation errors
  uuAppErrorMap = ValidationHelper.processValidationResult(
    dtoIn,
    validationResult,
    uuAppErrorMap,
    WARNINGS.Update.UnsupportedKeys.code,
    Errors.Update.InvalidDtoIn
  );

  // Get the original shopping list from the DAO
  let original = await this.dao.get(awid, dtoIn.id);

  // Update the name of the shopping list
  original.name = dtoIn.name;

  // Update the shopping list in the DAO
  let result = await this.dao.update({ ...dtoIn, ...original });

  // Return the updated shopping list object along with the error map
  return { ...result, uuAppErrorMap };
}

  async list(awid, dtoIn) {

  }

  async updateShare(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListsUpdateShareDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.UpdateShare.UnsupportedKeys.code,
      Errors.UpdateShare.InvalidDtoIn
    );
    dtoIn.uuAppErrorMap = uuAppErrorMap;
    return dtoIn;
  }

async updateArchive(awid, dtoIn) {
  let uuAppErrorMap = {};
  const validationResult = this.validator.validate("shoppingListsUpdateArchiveDtoInType", dtoIn);

  uuAppErrorMap = ValidationHelper.processValidationResult(
    dtoIn,
    validationResult,
    uuAppErrorMap,
    WARNINGS.UpdateArchive.UnsupportedKeys.code,
    Errors.UpdateArchive.InvalidDtoIn
  );
  
  dtoIn.uuAppErrorMap = uuAppErrorMap;

  const shoppingList = await this.dao.get(awid, dtoIn.id);
  if (!shoppingList) {
    throw new Error("Shopping list not found.");
  }

  shoppingList.isArchived = dtoIn.isArchived;

  await this.dao.updateArchive(awid, shoppingList);

  return dtoIn;
}

/**
 * Deletes a shopping list.
 * 
 * @param {string} awid - The AWID (Awid of the workspace) to which the shopping list belongs.
 * @param {object} dtoIn - The input data transfer object containing the ID of the shopping list to delete.
 * @returns {object} - The deleted shopping list data transfer object.
 * @throws {Error} - If the shopping list is not found.
 */
async delete(awid, dtoIn) {
  let uuAppErrorMap = {};

  // Validate the input data transfer object
  const validationResult = this.validator.validate("shoppingListsDeleteDtoInType", dtoIn);

  // Process the validation result and update the error map if necessary
  uuAppErrorMap = ValidationHelper.processValidationResult(
    dtoIn,
    validationResult,
    uuAppErrorMap,
    WARNINGS.Delete.UnsupportedKeys.code,
    Errors.Delete.InvalidDtoIn
  );

  // Update the input data transfer object with the error map
  dtoIn.uuAppErrorMap = uuAppErrorMap;

  // Get the shopping list by ID
  const shoppingList = await this.dao.get(awid, dtoIn.id);

  // Throw an error if the shopping list is not found
  if (!shoppingList) {
    throw new Error("Shopping list not found.");
  }

  // Delete the shopping list
  await this.dao.delete(awid, dtoIn.id);

  // Return the deleted shopping list data transfer object
  return dtoIn;
}

/**
 * Creates a new shopping list.
 * 
 * @param {string} awid - The unique identifier of the application workspace.
 * @param {object} dtoIn - The input data for creating the shopping list.
 * @returns {object} - The created shopping list along with the error map.
 */
async create(awid, dtoIn) {
  let uuAppErrorMap = {};

  // Validate the input data
  const validationResult = this.validator.validate("shoppingListsCreateDtoInType", dtoIn);

  // Process the validation result and update the error map
  uuAppErrorMap = ValidationHelper.processValidationResult(
    dtoIn,
    validationResult,
    uuAppErrorMap,
    WARNINGS.Create.UnsupportedKeys.code,
    Errors.Create.InvalidDtoIn
  );

  // Set the application workspace ID
  const list = dtoIn;
  list.awid = awid;

  let outputObject = {};

  try {
    // Create the shopping list using the DAO
    outputObject = this.dao.create(list);
  } catch (e) {
    // Throw an error if the DAO create operation fails
    throw new Errors.Create.ListDaoCreateFailed({ uuAppErrorMap }, e);
  }

  // Return the created shopping list along with the error map
  return { ...outputObject, uuAppErrorMap };
}

/**
 * Retrieves a shopping list based on the provided AWID and DTO input.
 * @param {string} awid - The AWID (Awake Workspace ID).
 * @param {object} dtoIn - The DTO (Data Transfer Object) input.
 * @returns {object} - The retrieved shopping list with the uuAppErrorMap.
 * @throws {Errors.Get.NotFound} - If the shopping list is not found.
 */
async get(awid, dtoIn) {
  let uuAppErrorMap = {};

  // Validate the DTO input
  const validationResult = this.validator.validate("shoppingListsGetDtoInType", dtoIn);
  uuAppErrorMap = ValidationHelper.processValidationResult(
    dtoIn,
    validationResult,
    uuAppErrorMap,
    WARNINGS.Get.UnsupportedKeys.code,
    Errors.Get.InvalidDtoIn
  );

  // Retrieve the shopping list from the DAO
  const result = await this.dao.get(awid, dtoIn);

  // If the shopping list is not found, throw an error
  if (!result) {
    throw new Errors.Get.NotFound({ uuAppErrorMap });
  }

  // Return the retrieved shopping list with the uuAppErrorMap
  return {
    ...result,
    uuAppErrorMap
  };
}

}

module.exports = new ListAbl();
