import { AppDispatch, RootState } from '../../store/store'

import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { googleLogout } from '@react-oauth/google'
import { logout } from '../../store/reducers/authSlice'

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loggedIn, userInfo } = useSelector((state: RootState) => state.auth)

  const logOut = () => {
    googleLogout()

    localStorage.setItem('token', '')

    dispatch(logout())
  }

  return (
    <StyledHeader>
      <StyledNav>
        <NavList>
          <NavItem>
            <StyledLink to={'/'}>E-commerce</StyledLink>
          </NavItem>
          <MenuGroup>
            {userInfo.role === 'ADMIN' && (
              <>
                <LinkWrapper>
                  <StyledLink to={'/admin'}>Products</StyledLink>
                </LinkWrapper>
                <LinkWrapper>
                  <StyledLink to={'/admin/category'}>Categories</StyledLink>
                </LinkWrapper>
              </>
            )}
            <LinkWrapper>
              <StyledLink to={'/cart'}>Cart</StyledLink>
            </LinkWrapper>
            {loggedIn ? (
              <Button onClick={logOut}>Log out</Button>
            ) : (
              <StyledLink to={'/login'}>Log in</StyledLink>
            )}
          </MenuGroup>
        </NavList>
      </StyledNav>
    </StyledHeader>
  )
}

const StyledHeader = styled('header')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 20,
  padding: '20px 20px',
  backgroundColor: '#D1D3D3',
  alignItems: 'center'
})

const MenuGroup = styled('div')({
  display: 'flex',
  gap: 30
})

const LinkWrapper = styled('li')({
  display: 'flex',
  alignItems: 'center'
})

const StyledLink = styled(Link)({
  color: 'black'
})

const NavList = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  listStyleType: 'none'
})

const StyledNav = styled('nav')({
  width: '100%'
})

const NavItem = styled('li')({})
