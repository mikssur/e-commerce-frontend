import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../api/api_instance'

export interface Category {
  title: string
}

export const fetchCategoriesThunk = createAsyncThunk('categories', async () => {
  const categories = await instance({
    method: 'get',
    url: '/product-categories'
  })

  const { data } = categories

  return data
})

export const createCategoryThunk = createAsyncThunk(
  'categories/create',
  async (category: Category) => {
    const token = localStorage.getItem('token')

    const newCategory = await instance({
      method: 'post',
      url: '/product-categories',
      data: category,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = newCategory

    return data
  }
)

export const deleteCategoryThunk = createAsyncThunk('categories/delete', async (id: number) => {
  const token = localStorage.getItem('token')

  await instance({
    method: 'delete',
    url: `/product-categories/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return id
})
