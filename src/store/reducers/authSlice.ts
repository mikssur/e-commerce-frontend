import { createSlice } from '@reduxjs/toolkit'
import { authUserThunk, userInit } from '../actions/authAction'

export type Role = 'USER' | 'ADMIN'

export interface UserInfo {
  name: string
  email: string
  role: Role
  id: string
}

export interface UserState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  userInfo: UserInfo
  loggedIn: boolean
}

const initialState: UserState = {
  loggedIn: false,
  isLoading: false,
  isSuccess: true,
  isError: false,
  userInfo: {
    name: '',
    email: '',
    role: 'USER',
    id: ''
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo.name = ''
      state.userInfo.email = ''
      state.userInfo.role = 'USER'
      state.loggedIn = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authUserThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(authUserThunk.fulfilled, (state, action) => {
      state.userInfo.name = action.payload.name
      state.userInfo.email = action.payload.email
      state.userInfo.role = action.payload.role
      state.userInfo.id = action.payload.id
      state.loggedIn = true
      state.isLoading = false
    })
    builder.addCase(authUserThunk.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
    builder.addCase(userInit.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userInit.fulfilled, (state, action) => {
      state.userInfo.name = action.payload.name
      state.userInfo.email = action.payload.email
      state.userInfo.role = action.payload.role
      state.userInfo.id = action.payload.id
      state.loggedIn = true
      state.isLoading = false
    })
    builder.addCase(userInit.rejected, (state) => {
      state.isError = true

      state.isLoading = false
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
