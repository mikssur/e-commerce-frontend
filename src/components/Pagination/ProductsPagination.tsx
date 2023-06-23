import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import Pagination from '@mui/material/Pagination'
import { AppDispatch, RootState } from '../../store/store'
import { setCurrentPage } from '../../store/reducers/productsSlice'

export const ProductsPagination = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { totalPages, currentPage } = useSelector((state: RootState) => state.products)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
  }

  return (
    <PaginationWrapper>
      <Pagination count={totalPages} page={currentPage} shape="rounded" onChange={handleChange} />
    </PaginationWrapper>
  )
}
const PaginationWrapper = styled('div')({
  marginTop: 60,
  display: 'flex',
  justifyContent: 'center'
})
