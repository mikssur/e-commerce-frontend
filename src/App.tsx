import { ItemList } from './components/ItemList/ItemList'
import { ProductsPagination } from './components/Pagination/ProductsPagination'

import { Outlet } from 'react-router-dom'
import { SearchFilter } from './components/SearchFilter/SearchFilter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import { userInit } from './store/actions/authAction'

export const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const jwtToken = localStorage.getItem('token')
    if (jwtToken) {
      dispatch(userInit(jwtToken))
    }
  }, [])

  return (
    <>
      <SearchFilter />
      <ItemList isAdminView={false} />
      <ProductsPagination />
      <Outlet />
    </>
  )
}
