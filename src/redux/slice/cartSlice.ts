import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItems,
  fetchCartItems,
  updateCard,
  updateCartItems,
} from "../async/cartAsync";

interface CartState {
  cartItems: ICartItems[];
  status: "idle" | "loading" | "failed";
}

const initialState: CartState = {
  cartItems: [],
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchCartItems
    builder.addCase(fetchCartItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchCartItems.fulfilled,
      (state, action: PayloadAction<ICartItems[]>) => {
        state.status = "idle";
        state.cartItems = action.payload;
      }
    );
    builder.addCase(fetchCartItems.rejected, (state) => {
      state.status = "failed";
    });

    // Handle addToCart
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<ICartItems>) => {
        const existingProduct = state.cartItems.find(
          (item) => item.Id === action.payload.Id
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.cartItems.push(action.payload);
        }
      }
    );

    // Handle updateCartItem
    builder.addCase(
      updateCartItems.fulfilled,
      (state, action: PayloadAction<ICartItems>) => {
        const index = state.cartItems.findIndex(
          (item) => item.Id === action.payload.Id
        );
        if (index !== -1) {
          state.cartItems[index].quantity = action.payload.quantity;
        }
      }
    );

    // Handle deleteCartItem
    builder.addCase(
      deleteCartItems.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.Id !== action.payload
        );
      }
    );

    // Handle updateCards
    builder.addCase(
      updateCard.fulfilled,
      (state, action: PayloadAction<ICards>) => {
        state.cartItems = action.payload.cartItems;
      }
    );
  },
});

export default cartSlice.reducer;
