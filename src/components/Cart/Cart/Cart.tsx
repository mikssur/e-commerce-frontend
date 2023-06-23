import { useDispatch } from 'react-redux'

import styled from '@emotion/styled'
import { Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { CartType, removeFromCart } from '../../../store/reducers/cartSlice'
import { AppDispatch } from '../../../store/store'

export const Cart = ({ id, counter, currentSize, image, title }: CartType) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
      <CartSection>
        <ImageWrapper>
          <StyledCardImage src={image} alt="product" />
        </ImageWrapper>
        <InfoSection>
          <Title>{title}</Title>
          <Details>
            <p>Black</p>
            <p>{currentSize}</p>
            <p>qty: {counter}</p>
          </Details>
          <ButtonWrapper>
            <StyledDeleteIcon onClick={() => dispatch(removeFromCart(id))} />
          </ButtonWrapper>
        </InfoSection>
      </CartSection>
      <Divider />
    </>
  )
}

const CartSection = styled('section')({
  display: 'flex',
  gap: 10,
  height: 180
})

const ImageWrapper = styled('figure')({
  height: 180
})

const StyledCardImage = styled('img')({
  height: 180,
  width: 140
})

const InfoSection = styled('div')({
  height: 180
})

const Title = styled('h3')({
  fontSize: 14,
  height: 60
})

const Details = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 14,
  width: 160,
  height: 50
})

const ButtonWrapper = styled('div')({
  width: 180,
  height: 40,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'end'
})

const StyledDeleteIcon = styled(DeleteIcon)({
  ':hover': {
    color: '#b71f1f'
  }
})
