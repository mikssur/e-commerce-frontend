import { createSlice } from '@reduxjs/toolkit'
import {
  createCategoryThunk,
  deleteCategoryThunk,
  fetchCategoriesThunk
} from '../actions/categoriesAction'

interface Category {
  id: number
  title: string
}

interface CategoriesState {
  newCategory: string
  categoriesList: Category[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const initialState: CategoriesState = {
  newCategory: '',
  categoriesList: [],
  isLoading: false,
  isError: false,
  isSuccess: false
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    editCategory: (state, action) => {
      state.newCategory = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesThunk.pending, (state) => {
      state.isError = false
      state.isSuccess = false

      state.isLoading = true
    })
    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.categoriesList = action.payload

      state.isLoading = false
    })
    builder.addCase(fetchCategoriesThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(deleteCategoryThunk.pending, (state) => {
      state.isSuccess = false
      state.isError = false

      state.isLoading = true
    })
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      state.categoriesList = state.categoriesList.filter((category) => {
        if (category.id !== action.payload) return category
      })

      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(deleteCategoryThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(createCategoryThunk.pending, (state) => {
      state.isSuccess = false
      state.isError = false

      state.isLoading = true
    })
    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.categoriesList.push(action.payload)
      state.newCategory = ''

      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(createCategoryThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
  }
})

export const { editCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
