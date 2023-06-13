import { createSlice } from '@reduxjs/toolkit'
import {
  deleteProductThunk,
  fetchFilteredProductsThunk,
  fetchProductsThunk
} from '../actions/productsAction'

export interface Product {
  id: string
  title: string
  category: {
    id: number
    title: string
  }
  createdAt: string
  updatedAt: string
  price: number
  quantity: number
  image: string
  sex: string
}

interface ProductState {
  productList: Product[]
  isLoading: boolean
  isError: boolean
  searchQuery: string
  filterQuery: number | null
  currentPage: number
  totalPages: number
}

const initialState: ProductState = {
  productList: [],
  isLoading: false,
  isError: false,
  searchQuery: '',
  filterQuery: null,
  currentPage: 1,
  totalPages: 1
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productList.push(action.payload)
    },
    searchProducts: (state, action) => {
      state.searchQuery = action.payload
    },
    updateFilter: (state, action) => {
      state.filterQuery = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    deleteProduct: (state, action) => {
      state.productList = state.productList.filter((product) => {
        if (product.id !== action.payload) return product
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.productList = action.payload

      state.isLoading = false
    })
    builder.addCase(fetchProductsThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(deleteProductThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.productList = state.productList.filter((product) => {
        if (product.id !== action.payload) return product
      })

      state.isLoading = false
    })
    builder.addCase(deleteProductThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(fetchFilteredProductsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchFilteredProductsThunk.fulfilled, (state, action) => {
      state.productList = action.payload

      state.isLoading = false
    })
    builder.addCase(fetchFilteredProductsThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
  }
})

export const {
  addProduct,
  searchProducts,
  updateFilter,
  setTotalPages,
  setCurrentPage,
  deleteProduct
} = productsSlice.actions

export default productsSlice.reducer
