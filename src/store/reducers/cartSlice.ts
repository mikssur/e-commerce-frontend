import { createSlice } from '@reduxjs/toolkit'

export interface CartType {
  id: string
  productId: string
  counter: number
  currentSize: string
  title: string
  category: string
  image: string
}

interface CartState {
  cartList: CartType[]
}

const initialState: CartState = {
  cartList: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload)
    },
    removeFromCart: (state, action) => {
      const id = action.payload

      state.cartList = state.cartList.filter((cartItem) => {
        if (cartItem.id !== id) return cartItem
      })
    },
    clearCart: (state) => {
      state.cartList = []
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
