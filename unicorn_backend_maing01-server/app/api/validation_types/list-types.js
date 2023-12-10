/* eslint-disable */

const shoppingListsGetDtoInType = shape({
    id: id().isRequired()
});

const shoppingListsCreateDtoInType = shape({
    name: uu5String(32).isRequired(),
    listStatusArchived: boolean().isRequired(),
    itemIdList: array(id(), 1, 10).isRequired(),
});

const shoppingListsDeleteDtoInType = shape({
    id: id().isRequired()
});

const shoppingListsUpdateArchiveDtoInType = shape({
    id: id().isRequired(),
    listStatusArchived: boolean().isRequired()
});

const shoppingListsUpdateShareDtoInType = shape({
    id: id().isRequired(),
    listShareId: uuIdentity()
});

const shoppingListsListDtoInType = shape({
    pageInfo: pageInfo().isRequired()
});

const shoppingListsUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(1,255)
});