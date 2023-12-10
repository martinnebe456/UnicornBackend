/* eslint-disable */
const shoppingListItemGetDtoInType = shape({ 
    id: id().isRequired() 
});

const shoppingListItemCreateDtoInType = shape({
    name: uu5String(64).isRequired()
});

const shoppingListItemDeleteDtoInType = shape({ 
    id: id().isRequired() 
});

const shoppingListItemUpdateStateDtoInType = shape({
    id: id().isRequired(),
    itemStatusDone: boolean().isRequired()
});