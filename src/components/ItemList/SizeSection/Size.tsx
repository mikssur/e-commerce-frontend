import styled from '@emotion/styled'

interface SizeProps {
  sizeValue: string
  currentSize: string
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export const Size = ({ sizeValue, currentSize, handleChange }: SizeProps) => {
  return (
    <BoxSection>
      <SizeBox
        type="radio"
        id={sizeValue}
        name="size"
        value={sizeValue}
        onChange={(e) => handleChange(e)}></SizeBox>
      <LabelBox sizeValue={sizeValue} currentSize={currentSize} handleChange={handleChange}>
        {sizeValue}
      </LabelBox>
    </BoxSection>
  )
}

const BoxSection = styled('div')({
  position: 'relative'
})

const SizeBox = styled.input(() => ({
  position: 'absolute',
  appearance: 'none',
  border: '1px solid black',
  cursor: 'pointer',
  width: 26,
  height: 18,
  zIndex: 1000
}))

const LabelBox = styled.label((props: SizeProps) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.sizeValue === props.currentSize ? 'black' : 'white',
  color: props.sizeValue === props.currentSize ? 'white' : 'black',
  left: 5,
  top: 3,
  width: 26,
  height: 18,
  zIndex: 100
}))
