import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useGoogleLogin } from '@react-oauth/google'
import { AppDispatch } from '../../store/store'

import { authUserThunk } from '../../store/actions/authAction'

export const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(authUserThunk(codeResponse))
      navigate('/')
    },

    onError: (error) => console.log('Login Failed:', error)
  })

  return (
    <ModalBackground role="dialog" aria-modal="true">
      <StyledContainer>
        <StyledCloseIcon aria-label="Close" onClick={handleClose} />
        <Title>Login via Google</Title>
        <StyledButton variant="contained" onClick={() => login()}>
          Google login
        </StyledButton>
      </StyledContainer>
    </ModalBackground>
  )
}

const StyledContainer = styled(Paper)({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  padding: 20,
  width: 350,
  height: 450,
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 50
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

const Title = styled('h2')({
  textAlign: 'center'
})

const StyledCloseIcon = styled(CloseIcon)({
  position: 'absolute',
  top: 8,
  right: 10,
  cursor: 'pointer'
})

const StyledButton = styled(Button)({
  backgroundColor: '#DB4437',
  width: 220,
  alignSelf: 'center',

  ':hover': {
    backgroundColor: '#0F9D58'
  }
})
