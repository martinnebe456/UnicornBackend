const { TestHelper } = require("uu_appg01_server-test");

const fs = require("fs");
const path = require("path");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const {
    LIST_GET,
    LIST_CREATE
} = require("../general-test-helper.js");

beforeEach(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
    await TestHelper.teardown();
});

test("Get list - Happy Day Scenario", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    let create = await TestHelper.executePostCommand(LIST_CREATE, {
        name: "Seznam z Testu s items",
        listStatusArchived: "false",
        itemIdList: [
            "657329ed2ccc835bf0f16ee0",
            "65733ae402a42f27c85fcd32",
            "65733af102a42f27c85fcd35",
            "65733af802a42f27c85fcd38"
        ],
    })

    let get = await TestHelper.executeGetCommand(LIST_GET, { id: create.id }, session);
    expect(get.status).toEqual(200);
    expect(get.data.uuAppErrorMap).toEqual({});
})

test("Get list - List not found", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    try {
        await TestHelper.executeGetCommand(LIST_GET, { id: "657329ed2ccc835bf0f16ee0" }, session);
        throw new Error('Expected to throw an error for not found list, but did not.');
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch(/List not found/);
        expect(e.status).toEqual(404);
    }
})
