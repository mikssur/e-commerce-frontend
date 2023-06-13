import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Paper, TextField, Box, MenuItem, Alert } from '@mui/material'
import styled from '@emotion/styled'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button } from '../../../common/components/Button'
import { ImageSection } from './ImageSection'
import { generateDateId } from '../../../helpers/generateId'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import {
  addProductThunk,
  fetchProductByIdThunk,
  updateProductThunk
} from '../../../store/actions/productsAction'
import {
  deleteImage,
  resetProduct,
  rotateImage,
  updateCategory,
  updateDescrpition,
  updateImage,
  updatePrice,
  updateQuantity,
  updateTitle
} from '../../../store/reducers/productSlice'
import { fetchCategoriesThunk } from '../../../store/actions/categoriesAction'
import { Spinner } from '../../../common/components/Spinner'

export interface ImageUploadType {
  id: string
  source: string
  angle: number
}

export interface IFormInputs {
  title: string
  category: string
  price: string
  quantity: string
  description: string
}

export const AddUpdateForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [imageFile, setImageFile] = useState<File>()

  const { product, isError, isLoading, isSuccess } = useSelector(
    (state: RootState) => state.product
  )

  const { categoriesList } = useSelector((state: RootState) => state.categories)

  const { title, image, category, price, description, quantity } = product

  const { id } = useParams()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      category: '',
      price: '',
      quantity: '',
      description: ''
    }
  })

  const handleImageDelete = () => {
    dispatch(deleteImage())
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
    }
  }

  const handleRotate = () => {
    dispatch(rotateImage())
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (id) {
      dispatch(
        updateProductThunk({
          id: id,
          title: title,
          price: price,
          description: description,
          image:
            'https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/450188/item/eugoods_09_450188.jpg?width=722&impolicy=quality_70&imformat=chrome',
          quantity: quantity,
          categoryId: data.category
        })
      )
    } else {
      dispatch(
        addProductThunk({
          title: title,
          price: price,
          description: description,
          image: image.source,
          quantity: quantity,
          categoryId: data.category
        })
      )
    }
  }

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const uid = generateDateId()

        dispatch(updateImage({ id: uid, source: reader.result as string, angle: 0 }))
      }
      reader.readAsDataURL(imageFile)
    }
  }, [imageFile])

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
    if (id) {
      dispatch(fetchProductByIdThunk(id))
    } else {
      dispatch(resetProduct())
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FormContainer>
          <FormInternalContainer>
            <FormSection onSubmit={handleSubmit(onSubmit)} aria-labelledby="product-from">
              {isError && (
                <Alert severity="error" role="alert">
                  Something went wrong
                </Alert>
              )}
              {isSuccess && (
                <Alert severity="success" role="alert">
                  The action was successful!
                </Alert>
              )}
              <ImageSection
                imagesPreview={image}
                handleRotate={handleRotate}
                handleImageDelete={handleImageDelete}
                handleUpload={handleUpload}
              />
              <InputsSection>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <StyledLabel htmlFor="title">Title:</StyledLabel>
                      <Input
                        {...field}
                        id="title"
                        label="Title"
                        variant="outlined"
                        color="secondary"
                        value={title}
                        required
                        {...register('title', {
                          required: 'Required'
                        })}
                        error={!!errors?.title}
                        onChange={(event) => dispatch(updateTitle(event.target.value))}
                      />
                    </>
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledLabel htmlFor="category">Category:</StyledLabel>
                      <Input
                        {...field}
                        id="category"
                        value={category.id}
                        select
                        required
                        color="secondary"
                        label="Category"
                        variant="outlined"
                        {...register('category', {
                          required: 'Required'
                        })}
                        error={!!errors?.category}
                        onChange={(event) => dispatch(updateCategory(event.target.value))}>
                        {categoriesList.map((categoryy) => {
                          return (
                            <MenuItem
                              key={categoryy.id}
                              aria-label={categoryy.title}
                              value={categoryy.id}>
                              {categoryy.title}
                            </MenuItem>
                          )
                        })}
                      </Input>
                    </>
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledLabel htmlFor="price">Price:</StyledLabel>
                      <Input
                        {...field}
                        id="price"
                        value={price}
                        required
                        color="secondary"
                        label="Price"
                        variant="outlined"
                        {...register('price', {
                          required: 'Required'
                        })}
                        error={!!errors?.price}
                        onChange={(event) => dispatch(updatePrice(event.target.value))}></Input>
                    </>
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledLabel htmlFor="quantity">Price:</StyledLabel>
                      <Input
                        {...field}
                        id="quantity"
                        value={quantity}
                        required
                        color="secondary"
                        label="Quantity"
                        variant="outlined"
                        {...register('quantity', {
                          required: 'Required'
                        })}
                        error={!!errors?.quantity}
                        onChange={(event) => dispatch(updateQuantity(event.target.value))}
                      />
                    </>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledLabel htmlFor="description">Description:</StyledLabel>
                      <Input
                        {...field}
                        id="description"
                        value={description}
                        label="Write some description"
                        multiline
                        rows={4}
                        variant="outlined"
                        color="secondary"
                        onChange={(event) => dispatch(updateDescrpition(event.target.value))}
                      />
                    </>
                  )}
                />
              </InputsSection>
              <div onSubmit={handleSubmit(onSubmit)}>
                <Button
                  text={id ? 'Update' : 'Create'}
                  buttonType="primary"
                  block={true}
                  link={false}
                />
              </div>
            </FormSection>
          </FormInternalContainer>
        </FormContainer>
      )}
    </>
  )
}

const FormContainer = styled('div')({
  width: '100%',
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const FormInternalContainer = styled(Paper)({
  width: '60%',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  padding: 40,

  '@media (max-width: 600px)': {
    width: '100%',
    padding: 20
  }
})

const FormSection = styled('form')({
  height: '100%',
  gap: 40,
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'auto',
  marginRight: 'auto'
})

const StyledLabel = styled('label')({
  fontSize: 18,
  width: 314
})

const InputsSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,

  '@media (max-width: 354px)': {
    width: '90%'
  }
})

const Input = styled(TextField)({
  width: '100%'
})
