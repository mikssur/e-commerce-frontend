import { SizeSection } from '../SizeSection/SizeSection'
import { CounterButton } from '../CounterButton/CounterButton'
import { Button } from '../../../common/components/Button'

import { Paper } from '@mui/material'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { ChangeEvent, useState } from 'react'
import { generateDateId } from '../../../helpers/generateId'
import { addToCart } from '../../../store/reducers/cartSlice'
import { deleteProduct } from '../../../store/reducers/productsSlice'
import CloseIcon from '@mui/icons-material/Close'
import { deleteProductThunk } from '../../../store/actions/productsAction'

interface ItemCardProps {
  title: string
  category: string
  image: string
  productId: string
  isAdminView: boolean
}

export const ItemCard = ({ title, category, image, productId, isAdminView }: ItemCardProps) => {
  const [counter, setCounter] = useState(1)
  const [isActive, setIsActive] = useState(false)
  const [currentSize, setCurrentSize] = useState('XS')
  const dispatch = useDispatch<AppDispatch>()

  const handleChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(e.target.value)
  }

  const handleIncrement = () => {
    setCounter((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (counter !== 1) {
      setCounter((prev) => prev - 1)
    }
  }

  const handleSubmit = (productId: string, title: string, category: string, image: string) => {
    const id = generateDateId()
    dispatch(addToCart({ counter, currentSize, productId, id, title, category, image }))
  }

  const handleClick = () => {
    handleSubmit(productId, title, category, image)
  }

  const handleOpenModal = () => {
    setIsActive(true)
  }

  const handleDelete = () => {
    dispatch(deleteProductThunk(productId))
  }

  const handleCancel = () => {
    setIsActive(false)
  }

  return (
    <>
      {isActive && (
        <ModalBackground>
          <Modal>
            <StyledCloseIcon aria-label="Close" role="button" onClick={handleCancel} />
            <h2>Are you sure?</h2>
            <ModalButtonSection>
              <Button
                text="Confirm"
                block={true}
                link={false}
                handleClick={handleDelete}
                primary={true}
                buttonType="primary"
              />
              <Button
                text="Cancel"
                block={true}
                link={false}
                handleClick={handleCancel}
                buttonType="default"
              />
            </ModalButtonSection>
          </Modal>
        </ModalBackground>
      )}

      <StyledCardContainer>
        <StyledInternalCardContainer>
          <ImageWrapper>
            <StyledCardImage src={image} alt="product image" />
          </ImageWrapper>
          <ContentContainer>
            <StyledCardTitle>{title}</StyledCardTitle>
            <StyledCardCategory>{category}</StyledCardCategory>
            <BottomSection>
              {isAdminView ? (
                <AdminBottomSection>
                  <Button
                    buttonType="primary"
                    primary={true}
                    text="Edit"
                    link={true}
                    to={`/admin/${productId}/edit`}
                  />
                  <Button
                    buttonType="warning"
                    primary={true}
                    text="Delete"
                    handleClick={handleOpenModal}
                    block={true}
                    link={false}
                    to={`/admin/${productId}/edit`}
                  />
                </AdminBottomSection>
              ) : (
                <>
                  <SizeSection currentSize={currentSize} handleChangeSize={handleChangeSize} />
                  <CardButtonSection>
                    <Button
                      buttonType="primary"
                      primary={false}
                      text="Add to bag"
                      handleClick={handleClick}
                      link={false}
                    />
                    <CounterButton
                      counter={counter}
                      onDecrement={handleDecrement}
                      onIncrement={handleIncrement}
                    />
                  </CardButtonSection>
                </>
              )}
            </BottomSection>
          </ContentContainer>
        </StyledInternalCardContainer>
      </StyledCardContainer>
    </>
  )
}

const StyledCloseIcon = styled(CloseIcon)({
  position: 'absolute',
  top: 8,
  right: 10,
  cursor: 'pointer'
})

const StyledCardContainer = styled(Paper)({
  display: 'flex',
  width: 280,
  height: 462,
  justifyContent: 'center',
  border: '1px solid #f5f5f7'
})

const Modal = styled(Paper)({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  padding: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
  flexDirection: 'column',
  opacity: 1,
  zIndex: 2000
})

const ModalBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  zIndex: 1900
})

const ModalButtonSection = styled('div')({
  justifyContent: 'center',
  width: '80%',
  display: 'flex',
  gap: 40
})

const StyledInternalCardContainer = styled('li')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const ContentContainer = styled('div')({
  width: '80%'
})

const ImageWrapper = styled('div')({
  height: 220,
  marginTop: 31,
  marginBottom: 8
})

const StyledCardImage = styled('img')({
  height: 220,
  width: 220
})

const StyledCardTitle = styled('div')({
  fontSize: 14,
  height: 60,
  marginBottom: 8
})

const StyledCardCategory = styled('div')({
  marginBottom: 10,
  fontSize: 12
})

const CardButtonSection = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between'
})

const BottomSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 41
})

const AdminBottomSection = styled('div')({
  display: 'flex',
  gap: 14
})
