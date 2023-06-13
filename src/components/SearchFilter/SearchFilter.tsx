import { Filter } from './Filter/Filter'
import { SearchBar } from './Search/SearchBar'
import { Button } from '../../common/components/Button'

import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchCategoriesThunk } from '../../store/actions/categoriesAction'
import { FilterChip } from './FilterChip/FilterChip'
import { updateFilter } from '../../store/reducers/productsSlice'
import { fetchFilteredProductsThunk } from '../../store/actions/productsAction'

export const SearchFilter = () => {
  const [isActive, setIsActive] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const { categoriesList } = useSelector((state: RootState) => state.categories)

  const { filterQuery, searchQuery } = useSelector((state: RootState) => state.products)

  const handleActive = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    dispatch(updateFilter(null))
    dispatch(fetchFilteredProductsThunk({ title: searchQuery, categoryId: null }))
  }

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
  }, [])

  return (
    <>
      <SearchFilterContainer>
        <Filter handleActive={handleActive} />
        <SearchBar />
      </SearchFilterContainer>
      {isActive && (
        <LowerContentWrapper>
          <LowerContent>
            <StyledForm>
              <Divider role="separator" />
              <CategoriesListContainer>
                {categoriesList.map((category) => (
                  <FilterChip
                    key={category.id}
                    title={category.title}
                    categoryId={category.id}
                    filterQuery={filterQuery}
                    searchQuery={searchQuery}
                  />
                ))}
              </CategoriesListContainer>
              <ButtonWrappertwo>
                <ButtonWrapper>
                  <Button
                    text="Reset"
                    primary={true}
                    buttonType="primary"
                    link={false}
                    handleClick={handleReset}
                  />
                </ButtonWrapper>
              </ButtonWrappertwo>
            </StyledForm>
          </LowerContent>
        </LowerContentWrapper>
      )}
    </>
  )
}

const SearchFilterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: 60,
  marginBottom: 20,

  '@media (max-width: 600px)': {
    flexDirection: 'column-reverse',
    gap: 30
  }
})

const LowerContentWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20
})

const LowerContent = styled('div')({
  width: 500,
  marginBottom: 40
})

const StyledForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12
})

const ButtonWrapper = styled('div')({
  position: 'absolute',
  right: 90
})

const ButtonWrappertwo = styled('div')({
  position: 'relative',
  width: 500,

  '@media (max-width: 600px)': {
    width: 300
  }
})

const CategoriesListContainer = styled('ul')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 14,
  listStyle: 'none',
  marginLeft: 0,
  paddingLeft: 0
})
