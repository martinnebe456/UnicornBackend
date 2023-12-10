"use strict";
const ListAbl = require("../../abl/list-abl.js");

class ListController {

  update(ucEnv) {
    return ListAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  updateShare(ucEnv) {
    return ListAbl.updateShare(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  updateArchive(ucEnv) {
    return ListAbl.updateArchive(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return ListAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ListAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ListAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ListController();
