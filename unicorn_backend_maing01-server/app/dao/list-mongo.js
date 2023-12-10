"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {

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

  async update(UuObject){
    let filter = {
      awid: UuObject.awid,
      id: UuObject.id
    };
    return super.findOneAndUpdate(filter, UuObject, "NONE");
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
  
    const filter = { awid, id: dtoIn.id };
    const update = { $set: { isArchived: dtoIn.isArchived } };
    const options = { returnOriginal: false };
  
    const updatedShoppingList = await this.dao.findOneAndUpdate(filter, update, options);
  
    if (!updatedShoppingList) {
      throw new Error("Shopping list not found.");
    }
  
    return dtoIn;
  }

}

module.exports = ListMongo;
