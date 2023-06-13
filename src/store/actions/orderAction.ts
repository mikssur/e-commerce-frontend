import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../api/api_instance'

export interface OrderItem {
  productId: string
  quantity: number
}

interface CreateOrder {
  userId: number
  orderItemList: OrderItem[]
}

export const createOrderThunk = createAsyncThunk(
  'order/create',
  async (orderItemList: CreateOrder) => {
    const token = localStorage.getItem('token')

    const newOrder = await instance({
      method: 'post',
      url: '/orders',
      data: orderItemList,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = newOrder

    return data
  }
)
