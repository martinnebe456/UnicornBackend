"use strict";

const BackendMainUseCaseError = require("./backend-main-use-case-error.js");
const ITEM_ERROR_PREFIX = `${BackendMainUseCaseError.ERROR_PREFIX}item/`;

const Get = {
  UC_CODE: `${ITEM_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ItemNotFound: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}itemNotFound`;
      this.message = "Item not found.";
    }
  }
};

const Create = {
  UC_CODE: `${ITEM_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Delete = {
  UC_CODE: `${ITEM_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const UpdateState = {
  UC_CODE: `${ITEM_ERROR_PREFIX}updateState/`,
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateState.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const List = {
  UC_CODE: `${ITEM_ERROR_PREFIX}list/`,
  
};

module.exports = {
  List,
  UpdateState,
  Delete,
  Create,
  Get
};
