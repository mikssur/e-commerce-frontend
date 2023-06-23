import styled from '@emotion/styled'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

export const NewProductCard = () => {
  return (
    <StyledCardContainer>
      <Link to={'/admin/new'}>
        <StyledAddContainer>
          <StyledAddIcon />
          <StyledAddText>ADD NEW</StyledAddText>
        </StyledAddContainer>
      </Link>
    </StyledCardContainer>
  )
}

const StyledCardContainer = styled(Paper)({
  display: 'flex',
  width: 280,
  height: 462,
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #f5f5f7'
})

const StyledAddContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: '#E0E1E1',
  cursor: 'pointer',
  transition: 'all 0.3s',

  ':hover': {
    color: 'grey'
  }
})

const StyledAddIcon = styled(AddIcon)({
  height: 240,
  width: 240
})

const StyledAddText = styled('span')({
  textAlign: 'center'
})
