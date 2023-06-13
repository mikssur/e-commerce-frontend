import styled from '@emotion/styled'

interface CounterButtonProps {
  counter: number
  onIncrement: () => void
  onDecrement: () => void
}

export const CounterButton = ({ counter, onIncrement, onDecrement }: CounterButtonProps) => {
  return (
    <CardButtonCounter>
      <CounterSection>
        <CounterWrapper onClick={onDecrement}>
          <CounterMinus />
        </CounterWrapper>
        <Counter>{counter}</Counter>
        <CounterWrapper onClick={onIncrement}>
          <CounterPlus />
        </CounterWrapper>
      </CounterSection>
    </CardButtonCounter>
  )
}

const CardButtonCounter = styled('div')({
  position: 'absolute',
  display: 'flex',
  height: 38,
  left: 45,
  alignItems: 'center',
  fontSize: 13,
  fontWeight: '500',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderWidth: 1,
  borderRadius: 90,
  transition: 'all 0.3s',
  width: 119,
  justifyContent: 'end',
  color: '#2e2e33',
  backgroundColor: '#D1D3D3',
  zIndex: '10'
})

const CounterSection = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  width: 70,
  gap: 8
})

const CounterWrapper = styled('div')({
  height: 30,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const CounterMinus = styled('div')({
  height: 10,
  width: 10,
  backgroundColor: '#2e2e33',
  cursor: 'pointer',
  clipPath: 'polygon(100% 35%, 100% 60%, 0% 60%, 0% 35%)'
})

const CounterPlus = styled('div')({
  height: 10,
  width: 10,
  backgroundColor: '#2e2e33',
  cursor: 'pointer',
  clipPath:
    'polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 60%, 65% 60%, 65% 100%, 35% 100%, 35% 60%, 0% 60%, 0% 35%, 35% 35%)'
})

const Counter = styled('span')({
  textAlign: 'center',
  width: 12
})
