const { TestHelper } = require("uu_appg01_server-test");

const fs = require("fs");
const path = require("path");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const {
  ITEM_CREATE, ITEM_GET
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
  expect(itemGetResult.status).toEqual(200);
  expect(itemGetResult.data.uuAppErrorMap).toEqual({});
});

test("Get item - List not found", async () => {
  let session = await TestHelper.login("AwidLicenseOwner", false, false);

  try {
    await TestHelper.executeGetCommand(ITEM_GET, { id: "657329ed2ccc835bf0f16ee0" }, session);
    throw new Error('Expected to throw an error for not found item, but did not.');
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toMatch(/Item not found/);
    expect(e.status).toEqual(400);
  }
});
