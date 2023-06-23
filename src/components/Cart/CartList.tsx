import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Alert, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../store/store'
import { Button } from '../../common/components/Button'
import { Cart } from './Cart/Cart'
import { clearCart } from '../../store/reducers/cartSlice'
import { OrderItem, createOrderThunk } from '../../store/actions/orderAction'
import CircularProgress from '@mui/material/CircularProgress'

export const CartList = () => {
  const cartList = useSelector((state: RootState) => state.cart.cartList)
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
  const { isError, isLoading, isSuccess } = useSelector((state: RootState) => state.orders)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleClose = () => {
    navigate('/')
  }

  if (cartList.length === 0) {
    return (
      <CartContainer>
        <ContentWrapper>
          <StyledCloseIcon onClick={handleClose} />
          {isLoading && <CircularProgress />}
          {isError && <Alert severity="error">Something went wrong</Alert>}
          {isSuccess && <Alert severity="success">Order was created!</Alert>}
          <Message>Empty</Message>
        </ContentWrapper>
      </CartContainer>
    )
  }

  const handleCheckout = () => {
    if (loggedIn) {
      if (cartList.length) {
        const orderItemList = [] as OrderItem[]

        cartList.forEach((product) => {
          orderItemList.push({ productId: product.productId, quantity: product.counter })
        })

        dispatch(createOrderThunk({ userId: 1, orderItemList }))

        dispatch(clearCart())
      }
    } else {
      navigate('/login')
    }
  }

  return (
    <CartContainer>
      <ContentWrapper>
        <StyledCloseIcon onClick={handleClose} />

        {cartList.map((item) => (
          <Cart
            key={item.id}
            id={item.id}
            productId={item.productId}
            counter={item.counter}
            currentSize={item.currentSize}
            title={item.title}
            category={item.category}
            image={item.image}
          />
        ))}
        <ButtonWrapper>
          <Button
            primary={true}
            buttonType="primary"
            text="Checkout"
            block={true}
            link={false}
            handleClick={handleCheckout}
          />
        </ButtonWrapper>
      </ContentWrapper>
    </CartContainer>
  )
}

const CartContainer = styled(Paper)({
  position: 'absolute',
  top: 52,
  right: 114,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: 350,
  padding: '15px 10px',
  minHeight: 200,
  zIndex: 1500,
  maxHeight: 490,
  overflow: 'scroll'
})

const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  position: 'relative'
})

const Message = styled('h2')({
  display: 'flex',
  alignSelf: 'center',
  alignItems: 'center',
  height: 160,
  fontSize: 18
})

const ButtonWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const StyledCloseIcon = styled(CloseIcon)({
  position: 'absolute',
  top: -8,
  right: 10,
  cursor: 'pointer'
})
