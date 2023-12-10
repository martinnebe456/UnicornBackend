"use strict";

const BackendMainUseCaseError = require("./backend-main-use-case-error.js");
const LIST_ERROR_PREFIX = `${BackendMainUseCaseError.ERROR_PREFIX}list/`;

const Get = {
  UC_CODE: `${LIST_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
      this.status = 400;
    }
  },

  NotFound: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}notFound`;
      this.message = "List not found.";
      this.status = 404;
    }
  }

};

const Create = {
  UC_CODE: `${LIST_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDaoCreateFailed: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}listDaoCreateFailed`;
      this.message = "List creation failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${LIST_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const UpdateArchive = {
  UC_CODE: `${LIST_ERROR_PREFIX}updateArchive/`,
  
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateArchive.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const UpdateShare = {
  UC_CODE: `${LIST_ERROR_PREFIX}updateShare/`,
  
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShare.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDoesNotExist: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShare.UC_CODE}listDoesNotExist`;
      this.message = "List does not exist.";
    }
  }
};

const List = {
  UC_CODE: `${LIST_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Update = {
  UC_CODE: `${LIST_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDoesNotExist: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}listDoesNotExist`;
      this.message = "List does not exist.";
    }
  }
};

module.exports = {
  Update,
  List,
  UpdateShare,
  UpdateArchive,
  Delete,
  Create,
  Get
};
