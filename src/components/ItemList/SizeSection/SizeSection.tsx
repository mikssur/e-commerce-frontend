import styled from '@emotion/styled'

import { Size } from './Size'

const SIZES_DATA = [
  { value: 'XS' },
  { value: 'S' },
  { value: 'M' },
  { value: 'L' },
  { value: 'XL' }
]

interface SizeSctionProps {
  currentSize: string
  handleChangeSize: (e: any) => void
}

export const SizeSection = ({ currentSize, handleChangeSize }: SizeSctionProps) => {
  return (
    <Section>
      {SIZES_DATA.map((size) => (
        <Size
          key={size.value}
          sizeValue={size.value}
          currentSize={currentSize}
          handleChange={handleChangeSize}
        />
      ))}
    </Section>
  )
}

const Section = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: 140,
  height: 25
})
