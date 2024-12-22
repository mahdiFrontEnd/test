import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const ItemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        getItems: (state, action) => {
            state.items = action.payload;
        },
        DeleteItem: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload);
            state.items.splice(index, 1);
        },
        UpdateItems: {
            reducer: (state, action) => {
                state.items = state.items.map((item) =>
                    item.id === action.payload.id
                        ? {...item, [action.payload.field]: action.payload.value}
                        : item,
                );
            },
            prepare: (id, field, value) => {
                return {
                    payload: {id, field, value},
                };
            },
        },
        addItems: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },


            prepare: (id, name, product_id, quantity, price, total, measurement,
                      currency,
                      measurement_name,
                      currency_name,) => {
                return {
                    payload: {
                        id,
                        name,
                        product_id,
                        quantity,
                        price,
                        total, measurement,
                        currency,
                        measurement_name,
                        currency_name,
                    },
                };
            },
        },
    },
});

export const {
    getItems,
    DeleteItem,
    UpdateItems
    , addItems
} = ItemSlice.actions;

export default ItemSlice.reducer;
