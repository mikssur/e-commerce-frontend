import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

interface ButtonProps {
  primary?: boolean
  text: string
  handleClick?: () => void
  link: boolean
  to?: string
  block?: boolean
  buttonType: 'default' | 'primary' | 'warning' | 'secondary'
}

const COLORS = {
  default: '#C1C1C1',
  primary: 'black',
  warning: '#ff3939',
  secondary: '#4cad7a'
}

export const Button = ({
  primary,
  text,
  handleClick,
  link,
  to = '/',
  block,
  buttonType = 'default'
}: ButtonProps) => {
  if (link) {
    return <StyledLink to={to}>{text}</StyledLink>
  }

  if (block) {
    return (
      <StyledBlockButton
        type="submit"
        text={text}
        onClick={handleClick}
        link={link}
        primary={primary}
        buttonType={buttonType}>
        {text}
      </StyledBlockButton>
    )
  }

  return (
    <StyledButton
      type="submit"
      primary={primary}
      text={text}
      onClick={handleClick}
      link={link}
      buttonType={buttonType}>
      {text}
    </StyledButton>
  )
}

const StyledLink = styled(Link)({
  display: 'flex',
  height: 38,
  alignItems: 'center',
  fontSize: 15,
  fontWeight: '500',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderWidth: 1,
  borderRadius: 90,
  transition: 'all 0.3s',
  width: 100,
  justifyContent: 'center',
  color: 'white',
  backgroundColor: 'black',
  cursor: 'pointer',
  zIndex: '100',

  ':active': {
    backgroundColor: '#cbcbcb',
    color: 'black'
  }
})

const StyledButton = styled.button((props: ButtonProps) => ({
  position: 'absolute',
  display: 'flex',
  height: 40,
  alignItems: 'center',
  fontSize: 15,
  fontWeight: '500',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderWidth: 1,
  borderRadius: 90,
  transition: 'all 0.3s',
  width: 100,
  justifyContent: 'center',
  color: 'white',
  backgroundColor: props.primary ? 'black' : '#4cad7a',
  cursor: 'pointer',
  zIndex: '100',

  ':active': {
    backgroundColor: props.primary ? '#cbcbcb' : 'black',
    color: props.primary ? 'black' : 'white'
  }
}))

const StyledBlockButton = styled.button((props: ButtonProps) => ({
  display: 'flex',
  height: 40,
  alignItems: 'center',
  fontSize: 15,
  fontWeight: '500',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderWidth: 1,
  borderRadius: 90,
  transition: 'all 0.3s',
  width: 100,
  justifyContent: 'center',
  color: 'white',
  backgroundColor: COLORS[props.buttonType],
  cursor: 'pointer',
  zIndex: '100',

  ':active': {
    backgroundColor: props.primary ? '#cbcbcb' : 'black',
    color: props.primary ? 'black' : 'white'
  }
}))
