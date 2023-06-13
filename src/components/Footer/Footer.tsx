import React from 'react'
import styled from '@emotion/styled'

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledSpan aria-label="copyright">Copyright</StyledSpan>
    </StyledFooter>
  )
}

const StyledFooter = styled('footer')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 'auto',
  width: '100%',
  height: 40,
  backgroundColor: 'black',
  alignItems: 'center',
  color: 'white'
})

const StyledSpan = styled('span')({
  marginLeft: 20
})
