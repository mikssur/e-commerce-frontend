import styled from '@emotion/styled'
import { ItemCard } from './ItemCard/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useEffect } from 'react'
import { fetchProductsThunk } from '../../store/actions/productsAction'
import { setTotalPages } from '../../store/reducers/productsSlice'
import { NewProductCard } from '../Admin/NewProductCard'
import { Spinner } from '../../common/components/Spinner'
import { Product } from '../../store/reducers/productsSlice'
interface ItemList {
  isAdminView: boolean
}

export const ItemList = ({ isAdminView = false }: ItemList) => {
  const dispatch = useDispatch<AppDispatch>()
  const { productList, isLoading, currentPage } = useSelector((state: RootState) => state.products)

  const productsDisplay = productList.slice(currentPage * 12 - 12, currentPage * 12)

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [])

  useEffect(() => {
    const totalPages = Math.ceil(productList.length / 12)

    dispatch(setTotalPages(totalPages))
  }, [productList])

  if (!!isLoading == false && !!productsDisplay.length == false) {
    return (
      <List>
        {isAdminView && <NewProductCard />}
        <h2>No products</h2>
      </List>
    )
  }

  return (
    <List>
      {isLoading ? null : isAdminView && <NewProductCard />}

      {isLoading ? (
        <Spinner />
      ) : (
        productsDisplay.map((item) => (
          <ItemCard
            isAdminView={isAdminView}
            key={item.id}
            title={item.title}
            category={item.category.title}
            image={item.image}
            productId={item.id}
          />
        ))
      )}
    </List>
  )
}

const List = styled('ul')({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: 0,
  gap: 20
})
