import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../api/api_instance'

interface Product {
  title: string
  price: number
  categoryId: string
  description: string
  quantity: number
  image: string
}

interface ProductUpdate extends Product {
  id: string
}

interface Query {
  title: string
  categoryId: number | null
}

export const fetchProductsThunk = createAsyncThunk('products/fetch', async () => {
  const products = await instance({
    method: 'get',
    url: '/products'
  })

  const { data } = products
  return data
})

export const fetchFilteredProductsThunk = createAsyncThunk(
  'products/filter',
  async (query: Query) => {
    const filteredProducts = await instance({
      method: 'get',
      url: `/products/search?title=${query.title}&categoryId=${
        query.categoryId === null ? '' : query.categoryId
      }`
    })

    const { data } = filteredProducts
    return data
  }
)

export const addProductThunk = createAsyncThunk('product/create', async (prodcut: Product) => {
  const token = localStorage.getItem('token')

  const newProduct = await instance({
    method: 'post',
    url: '/products',
    data: prodcut,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = newProduct

  return data
})

export const updateProductThunk = createAsyncThunk(
  'product/update',
  async (prodcut: ProductUpdate) => {
    const token = localStorage.getItem('token')

    const newProduct = await instance({
      method: 'put',
      url: '/products',
      data: prodcut,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = newProduct

    return data
  }
)

export const deleteProductThunk = createAsyncThunk('product/delete', async (id: string) => {
  const token = localStorage.getItem('token')

  await instance({
    method: 'delete',
    url: `/products/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return id
})

export const fetchProductByIdThunk = createAsyncThunk('product/fetch', async (id: string) => {
  const product = await instance(`/products/${id}`)

  const { data } = product
  return data
})
