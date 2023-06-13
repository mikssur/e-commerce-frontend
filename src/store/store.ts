import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import cartSlice from './reducers/cartSlice'
import productsSlice from './reducers/productsSlice'
import orderSlice from './reducers/orderSlice'
import productSlice from './reducers/productSlice'
import categoriesSlice from './reducers/categoriesSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
    orders: orderSlice,
    product: productSlice,
    categories: categoriesSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
