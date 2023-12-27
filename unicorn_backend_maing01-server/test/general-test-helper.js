const path = require("path");
const fs = require("fs");
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Config } = require("uu_appg01_server").Utils;
Config.set("server_root", path.resolve(__dirname, ".."));

const LISTS_INSTANCE_INIT = "sys/uuAppWorkspace/init";
const LISTS_INSTANCE_LOAD = "list/load";
const LISTS_INSTANCE_UPDATE = "list/update";
const LIST_CREATE = "list/create";
const LIST_GET = "list/get";
const LIST_UPDATE = "list/update";
const LIST_DELETE = "list/delete";
const LIST_LIST = "list/list";
const LIST_UPDATE_ARCHIVE = "list/updateArchive";
const LIST_UPDATE_SHARE = "list/updateShare";

const ITEM_CREATE = "item/create";
const ITEM_GET = "item/get";
const ITEM_DELETE = "item/delete";
const ITEM_UPDATE_STATE = "item/updateState";
const ITEM_LIST = "item/list";

const SHARE_CREATE = "share/createShare";

const MONGO_ID = "5f2f4f0d9b6b6b6b6b6b6b6b";

module.exports = {
    LISTS_INSTANCE_INIT,
    LISTS_INSTANCE_LOAD,
    LISTS_INSTANCE_UPDATE,
    LIST_CREATE,
    LIST_GET,
    LIST_UPDATE,
    LIST_DELETE,
    LIST_LIST,
    LIST_UPDATE_ARCHIVE,
    LIST_UPDATE_SHARE,
    ITEM_CREATE,
    ITEM_GET,
    ITEM_DELETE,
    ITEM_UPDATE_STATE,
    ITEM_LIST,
    SHARE_CREATE,
    MONGO_ID
}

