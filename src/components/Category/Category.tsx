import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { deleteCategoryThunk } from '../../store/actions/categoriesAction'

import { Chip } from '@mui/material'

interface ICategoryProps {
  id: number
  title: string
}

const Category = ({ id, title }: ICategoryProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    dispatch(deleteCategoryThunk(id))
  }

  return <Chip onDelete={() => handleDelete()} label={title} aria-label={title} />
}

export default Category
