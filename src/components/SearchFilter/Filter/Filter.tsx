import styled from '@emotion/styled'
import { Button } from '@mui/material'

interface FilterProps {
  handleActive: () => void
}
export const Filter = ({ handleActive }: FilterProps) => {
  return (
    <FilterContainer onClick={handleActive}>
      <StyledFilter variant="outlined">Filter</StyledFilter>
    </FilterContainer>
  )
}

const FilterContainer = styled('span')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  '@media (max-width: 600px)': {
    justifyContent: 'center'
  }
})

const StyledFilter = styled(Button)({
  color: 'grey',
  borderColor: 'grey',

  ':hover': {
    borderColor: 'grey'
  }
})
