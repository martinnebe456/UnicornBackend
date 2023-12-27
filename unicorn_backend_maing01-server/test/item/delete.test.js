const { TestHelper } = require("uu_appg01_server-test");

const fs = require("fs");
const path = require("path");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const {
    ITEM_CREATE, ITEM_GET, ITEM_DELETE
} = require("../general-test-helper.js");

  beforeEach(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  });
  
  afterEach(async () => {
    await TestHelper.teardown();
  });

  test("Create item - Happy Day Scenario", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    let dtoIn = {
        name: "Položka ke smazání",
    };
    let itemCreateResult = await TestHelper.executePostCommand(ITEM_CREATE, dtoIn, session);

    let itemGetResult = await TestHelper.executeGetCommand(ITEM_GET, { id: itemCreateResult.id }, session);

    let itemDeleteResult = await TestHelper.executePostCommand(ITEM_DELETE, { id: itemGetResult.data.id }, session);

    expect(itemDeleteResult.status).toEqual(200);
    expect(itemDeleteResult.data.uuAppErrorMap).toEqual({});
  });

  test("Delete item - Invalid dtoIn", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
  
    try {
      await TestHelper.executePostCommand(ITEM_DELETE, { name: "seznam" }, session);
      throw new Error('Expected to throw an error for invalid dtoIn, but did not.');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.status).toEqual(400);
    }
  })