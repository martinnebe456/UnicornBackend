"use strict";
const BackendMainAbl = require("../../abl/backend-main-abl.js");

class BackendMainController {
  init(ucEnv) {
    return BackendMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return BackendMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return BackendMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new BackendMainController();
