const { TestHelper } = require("uu_appg01_server-test");

const fs = require("fs");
const path = require("path");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const {
  LIST_CREATE
} = require("../general-test-helper.js");

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

test("Create list - Happy Day Scenario", async () => {
  let session = await TestHelper.login("AwidLicenseOwner", false, false);
  let dtoIn = {
    name: "Seznam z Testu s items",
    listStatusArchived: "false",
    itemIdList: [
      "657329ed2ccc835bf0f16ee0",
      "65733ae402a42f27c85fcd32",
      "65733af102a42f27c85fcd35",
      "65733af802a42f27c85fcd38"
    ],
  };
  let result = await TestHelper.executePostCommand(LIST_CREATE, dtoIn, session);
  expect(result.status).toEqual(200);
  expect(result.data.uuAppErrorMap).toEqual({});
});

test("Create list - Invalid dtoIn", async () => {
  let session = await TestHelper.login("AwidLicenseOwner", false, false);
  let dtoIn = {
    name: "Seznam z Testu s items",
    listStatusArchived: "false",
  };

  try {
    await TestHelper.executePostCommand(LIST_CREATE, dtoIn, session);
    throw new Error('Expected to throw an error for invalid dtoIn, but did not.');
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toMatch(/DtoIn is not valid/);
    expect(e.status).toEqual(400);
  }
});
