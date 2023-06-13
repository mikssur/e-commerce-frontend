import { Chip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { fetchFilteredProductsThunk } from '../../../store/actions/productsAction'
import { updateFilter } from '../../../store/reducers/productsSlice'

interface IFilterChipProps {
  title: string
  categoryId: number
  filterQuery: number | null
  searchQuery: string
}

export const FilterChip = ({ title, categoryId, filterQuery, searchQuery }: IFilterChipProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    dispatch(updateFilter(categoryId))
    dispatch(fetchFilteredProductsThunk({ title: searchQuery, categoryId: categoryId }))
  }

  return (
    <div>
      <Chip
        label={title}
        variant={filterQuery === categoryId ? 'filled' : 'outlined'}
        clickable={true}
        skipFocusWhenDisabled={true}
        onClick={handleClick}
      />
    </div>
  )
}
