import { AppDispatch } from '../store/store'
import { useDispatch } from 'react-redux'
import { ChangeEvent, useState } from 'react'
import { addToCart } from '../store/reducers/cartSlice'
import { generateDateId } from '../helpers/generateId'

export const useHandleCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [counter, setCounter] = useState(1)
  const [currentSize, setCurrentSize] = useState('XS')

  const handleChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(e.target.value)
  }

  const handleIncrement = () => {
    setCounter((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (counter !== 1) {
      setCounter((prev) => prev - 1)
    }
  }
  const id = generateDateId()

  const handleSubmit = (productId: string, title: string, category: string, image: string) => {
    dispatch(addToCart({ counter, currentSize, productId, id, title, category, image }))
  }

  return { counter, currentSize, handleIncrement, handleDecrement, handleChangeSize, handleSubmit }
}
