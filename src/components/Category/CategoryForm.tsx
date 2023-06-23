import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { createCategoryThunk, fetchCategoriesThunk } from '../../store/actions/categoriesAction'
import { editCategory } from '../../store/reducers/categoriesSlice'

import styled from '@emotion/styled'
import { Paper, TextField, Divider, Alert } from '@mui/material'

import { Button } from '../../common/components/Button'
import Category from './Category'
import { Spinner } from '../../common/components/Spinner'

interface IFormInputs {
  category: string
}

export const CategoriesList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categoriesList, isError, isLoading, isSuccess, newCategory } = useSelector(
    (state: RootState) => state.categories
  )

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      category: ''
    }
  })

  const onSubmit: SubmitHandler<IFormInputs> = () => {
    dispatch(createCategoryThunk({ title: newCategory }))
  }

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
  }, [])

  return (
    <Container>
      <StyledPaper>
        {isError && <Alert severity="error">Something went wrong</Alert>}
        {isSuccess && <Alert severity="success">The action was successful!</Alert>}
        <FormSection onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  label="Add new category"
                  variant="outlined"
                  color="secondary"
                  value={newCategory}
                  required
                  {...register('category', {
                    required: 'Required'
                  })}
                  error={!!errors?.category}
                  onChange={(event) => dispatch(editCategory(event.target.value))}
                />
              </>
            )}
          />
          <div onClick={handleSubmit(onSubmit)}>
            <Button block={true} primary={true} buttonType="primary" text="Add" link={false} />
          </div>
        </FormSection>

        <StyledDivider />
        {isLoading ? (
          <Spinner />
        ) : (
          <CategoriesListContainer>
            {categoriesList.map((category) => (
              <Category key={category.id} id={category.id} title={category.title} />
            ))}
          </CategoriesListContainer>
        )}
      </StyledPaper>
    </Container>
  )
}

const Container = styled('div')({
  width: '100%',
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const StyledPaper = styled(Paper)({
  width: '80%',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 44,
  paddingBottom: 44,
  gap: 40
})

const FormSection = styled('form')({
  height: '100%',
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  gap: 14
})

const Input = styled(TextField)({
  width: '100%'
})

const StyledDivider = styled(Divider)({
  width: '80%'
})

const CategoriesListContainer = styled('ul')({
  width: '80%',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 14,
  listStyle: 'none',
  marginLeft: 0,
  paddingLeft: 0
})
