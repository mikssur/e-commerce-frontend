import { FormEvent } from 'react'
import styled from '@emotion/styled'
import { InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import { searchProducts } from '../../../store/reducers/productsSlice'
import { Button } from '../../../common/components/Button'
import { fetchFilteredProductsThunk } from '../../../store/actions/productsAction'

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { filterQuery, searchQuery } = useSelector((state: RootState) => state.products)

  const submitFilter = (event: FormEvent<HTMLElement>) => {
    event.preventDefault()

    dispatch(fetchFilteredProductsThunk({ title: searchQuery, categoryId: filterQuery }))
  }

  return (
    <StyledForm onSubmit={submitFilter}>
      <StyledPaper>
        <StyledIconButton>
          <SearchIcon />
        </StyledIconButton>

        <StyledInputBase
          onChange={(event) => dispatch(searchProducts(event.target.value))}
          placeholder="Search by name"
          inputProps={{ 'aria-label': 'search by name' }}
        />
      </StyledPaper>
      <div onClick={submitFilter}>
        <Button block={true} primary={true} buttonType="primary" text="Search" link={false} />
      </div>
    </StyledForm>
  )
}

const StyledIconButton = styled('div')({
  padding: 8
})

const StyledForm = styled('form')({
  display: 'flex',
  gap: 14,

  '@media (max-width: 600px)': {
    alignSelf: 'center'
  }
})

const StyledInputBase = styled(InputBase)({
  width: 400
})

const StyledPaper = styled(Paper)({
  display: 'flex',
  height: 40,
  borderRadius: 40,
  width: 250,
  backgroundColor: 'white'
})
