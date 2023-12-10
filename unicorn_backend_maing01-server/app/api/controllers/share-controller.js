"use strict";
const ShareAbl = require("../../abl/share-abl.js");

class ShareController {

  createShare(ucEnv) {
    return ShareAbl.createShare(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ShareController();
