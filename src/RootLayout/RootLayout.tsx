import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'

import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

export const RootLayout = () => {
  return (
    <RootContainer>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </RootContainer>
  )
}

const RootContainer = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
})

const StyledMain = styled('main')({
  marginLeft: 40,
  marginRight: 40,
  marginBottom: 50,
  marginTop: 30
})
