import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../api/api_instance'

interface UserToken {
  access_token: string
}

export const authUserThunk = createAsyncThunk('auth/fetch', async (codeResponse: UserToken) => {
  const jwt = await instance({
    method: 'post',
    url: '/auth',
    data: { access_token: codeResponse.access_token }
  })

  const {
    data: { token }
  } = jwt

  localStorage.setItem('token', token)

  const decodedToken = JSON.parse(atob(jwt.data.token.split('.')[1]))

  const user = await instance({
    method: 'get',
    url: `/users/${decodedToken.id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = user

  return data
})

export const userInit = createAsyncThunk('user/fetch', async (token: string) => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]))

  const user = await instance({
    method: 'get',
    url: `/users/${decodedToken.id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = user
  return data
})
