"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ItemMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, id: 1 }, { unique: true });
  }

  async create(UuObject){
    return await super.insertOne(UuObject);
  }

  async get(awid, dtoIn) {
    let filter = {
      awid: awid
    };
    if(dtoIn.id){
      filter.id = dtoIn.id;
    }
    else{
      filter.code = dtoIn.code;
    }
    return await super.findOne(filter);
  }

  async delete(awid, dtoIn){
    let filter = {
      awid: awid
    };
    if(dtoIn.id){
      filter.id = dtoIn.id;
    }
    else{
      filter.code = dtoIn.code;
    }
    return await super.deleteOne(filter);
  }

}

module.exports = ItemMongo;
