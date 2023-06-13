import { createSlice } from '@reduxjs/toolkit'
import {
  fetchProductByIdThunk,
  addProductThunk,
  updateProductThunk
} from '../actions/productsAction'

export interface Product {
  title: string
  category: {
    id: number
    title: string
  }
  price: number
  description: string
  quantity: number
  image: {
    id: string
    source: string
    angle: number
  }
}

interface ProductState {
  product: Product
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const initialState: ProductState = {
  product: {
    title: '',
    price: 0,
    description: '',
    category: {
      id: 1,
      title: ''
    },
    quantity: 1,
    image: {
      id: '1',
      source: '',
      angle: 0
    }
  },
  isLoading: false,
  isError: false,
  isSuccess: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.product.title = action.payload
    },
    updatePrice: (state, action) => {
      state.product.price = action.payload
    },
    updateQuantity: (state, action) => {
      state.product.quantity = action.payload
    },
    updateDescrpition: (state, action) => {
      state.product.description = action.payload
    },
    updateCategory: (state, action) => {
      state.product.category.id = action.payload
    },
    updateImage: (state, action) => {
      state.product.image = action.payload
    },
    rotateImage: (state) => {
      if (state.product.image.angle === 270) {
        state.product.image.angle = 0
      } else if (state.product.image.angle !== undefined) {
        state.product.image.angle += 90
      }
    },
    deleteImage: (state) => {
      state.product.image.source = ''
    },
    resetProduct: (state) => {
      state.product.title = ''
      state.product.price = 0
      state.product.category.id = 1
      state.product.category.title = ''
      state.product.description = ''
      state.product.quantity = 1
      state.product.image = {
        id: '1',
        source: '',
        angle: 0
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductByIdThunk.pending, (state) => {
      state.isError = false
      state.isLoading = true
      state.isSuccess = false
    })
    builder.addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
      state.product.title = action.payload.title
      state.product.price = action.payload.price
      state.product.category.id = action.payload.category.id
      state.product.category.title = action.payload.category.title
      state.product.description = action.payload.description
      state.product.quantity = action.payload.quantity
      state.product.image.angle = 0
      state.product.image.id = '1'
      state.product.image.source = action.payload.image

      state.isLoading = false
    })
    builder.addCase(fetchProductByIdThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(addProductThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(addProductThunk.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(addProductThunk.fulfilled, (state, action) => {
      state.product.title = action.payload.title
      state.product.price = action.payload.price
      state.product.category.id = action.payload.category.id
      state.product.category.title = action.payload.category.title
      state.product.description = action.payload.description
      state.product.quantity = action.payload.quantity
      state.product.image.angle = 0
      state.product.image.id = '1'
      state.product.image.source = action.payload.image

      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(updateProductThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(updateProductThunk.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.product.title = action.payload.title
      state.product.price = action.payload.price
      state.product.category.id = action.payload.category.id
      state.product.category.title = action.payload.category.title
      state.product.description = action.payload.description
      state.product.quantity = action.payload.quantity
      state.product.image.angle = 0
      state.product.image.id = '1'
      state.product.image.source = action.payload.image

      state.isLoading = false
      state.isSuccess = true
    })
  }
})

export const {
  resetProduct,
  updateTitle,
  updateCategory,
  updatePrice,
  updateImage,
  rotateImage,
  deleteImage,
  updateDescrpition,
  updateQuantity
} = productSlice.actions

export default productSlice.reducer
