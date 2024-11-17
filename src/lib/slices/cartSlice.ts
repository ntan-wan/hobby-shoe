import { createSlice } from "@reduxjs/toolkit";
import {  CartItem } from "@/lib/types";

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.items.findIndex((item) => item.product.id === action.payload.id);

            //# Replace duplicate item.
            if (index !== -1) {
                state.items[index] = action.payload;
                return;
            }

            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.product.id !== action.payload);
        },

        updateCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const cartItem = state.items.find((item) => item.product.id == id);
            if (cartItem) {
                cartItem.quantity = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
