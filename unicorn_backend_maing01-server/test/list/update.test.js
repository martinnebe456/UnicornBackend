const { TestHelper } = require("uu_appg01_server-test");

const fs = require("fs");
const path = require("path");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const {
  LIST_UPDATE, LIST_CREATE, LIST_GET

} = require("../general-test-helper.js");

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

test("Update List - Happy Day Scenario", async () => {
  let session = await TestHelper.login("AwidLicenseOwner", false, false);

  let createResult = await TestHelper.executePostCommand(LIST_CREATE, {
    name: "Seznam z Testu s items",
    listStatusArchived: "false",
    itemIdList: [
      "657329ed2ccc835bf0f16ee0",
      "65733ae402a42f27c85fcd32",
      "65733af102a42f27c85fcd35",
      "65733af802a42f27c85fcd38"
    ],
  })

  let getResult = await TestHelper.executeGetCommand(LIST_GET, { id: createResult.id }, session);

  let updateResult = await TestHelper.executePostCommand(LIST_UPDATE, { id: getResult.id, name: "Seznam z Update testu s items" }, session);
  expect(updateResult.status).toEqual(200);
  expect(updateResult.data.uuAppErrorMap).toEqual({});
})

test("Update List - List not found", async () => {
  let session = await TestHelper.login("AwidLicenseOwner", false, false);

  try {
    await TestHelper.executePostCommand(LIST_UPDATE, { id: "657329ed2ccc835bf0f16ee0", name: "Seznam z Update testu s items" }, session);
    throw new Error('Expected to throw an error for not found list, but did not.');
  }catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.status).toEqual(500);
  }
})
