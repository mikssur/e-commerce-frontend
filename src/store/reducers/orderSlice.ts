import { createSlice } from '@reduxjs/toolkit'
import { createOrderThunk } from '../actions/orderAction'

export interface OrderType {
  id: string
  productsId: string[]
  quantity: number
  title: string
  createdAt: string
}

interface CartState {
  orders: OrderType[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const initialState: CartState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload)
    },
    archiveOrder: (state, action) => {
      const id = action.payload

      return {
        ...state,
        basketList: [...state.orders].filter((item) => {
          if (item.id !== id) return item
        })
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderThunk.pending, (state) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
    })
    builder.addCase(createOrderThunk.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(createOrderThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
  }
})

export const { addOrder, archiveOrder } = orderSlice.actions

export default orderSlice.reducer
