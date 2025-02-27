import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCart = {
  product: string;
  productName?: string;
  quantity: number;
  price?: number;
  stock?: number;
  image?: string;
};

export type CartState = {
  cart: TCart[];
  couponCode: string | null;
  discountAmount: number;
  subTotal: number;

  Total: number;
};
export type CheckOut = {
  discountAmount: number;
  subTotal: number;

  Total: number;
};

const initialState: CartState = {
  cart: [],
  couponCode: null,
  discountAmount: 0,
  subTotal: 0,

  Total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart or increase quantity if it exists
    addToCart: (state, action: PayloadAction<TCart>) => {
      const { product, productName, quantity, price, stock, image } =
        action.payload;
      const existingProduct = state.cart.find(
        (item) => item.product === product
      );

      if (existingProduct) {
        if (existingProduct.quantity + quantity <= (stock as number)) {
          existingProduct.quantity += quantity;
        }
      } else {
        state.cart.push({
          product,
          productName,
          quantity,
          price,
          stock,
          image,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.product !== action.payload);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.cart = [];
    },

    applyCoupon: (
      state,
      action: PayloadAction<{ couponCode: string; discountAmount: number }>
    ) => {
      state.couponCode = action.payload.couponCode;
      state.discountAmount = action.payload.discountAmount;
    },
    checkOut: (state, action: PayloadAction<CheckOut>) => {
      state.subTotal = action.payload.subTotal;
      state.discountAmount = action.payload.discountAmount;
      state.Total = action.payload.Total;
    },

    removeCoupon: (state) => {
      state.couponCode = null;
      state.discountAmount = 0;
    },
    removeCheckOut: (state) => {
      state.subTotal = 0;
      state.discountAmount = 0;
      state.Total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  checkOut,
} = cartSlice.actions;

export default cartSlice.reducer;
