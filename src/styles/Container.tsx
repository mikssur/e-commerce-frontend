import styled from '@emotion/styled'
import React from 'react'

export const Container = () => {
  return <StyledContainer></StyledContainer>
}

const StyledContainer = styled('div')({
  display: 'flex',
  margin: 10,
  marginLeft: 100,
  marginRight: 100,
  flexDirection: 'column',
  gap: 40
})
