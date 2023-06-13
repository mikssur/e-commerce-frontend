import CircularProgress from '@mui/material/CircularProgress'
import styled from '@emotion/styled'

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <LoadingSpinner />
    </SpinnerContainer>
  )
}

const LoadingSpinner = styled(CircularProgress)({
  display: 'flex',
  alignSelf: 'center'
})

const SpinnerContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '80vh',
  justifyContent: 'center',
  alignContent: 'center'
})
