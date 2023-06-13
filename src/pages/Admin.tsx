import { AdminItemList } from '../components/Admin/AdminItemList'
import { ProductsPagination } from '../components/Pagination/ProductsPagination'
import { SearchFilter } from '../components/SearchFilter/SearchFilter'

export const Admin = () => {
  return (
    <div>
      <SearchFilter />
      <AdminItemList />
      <ProductsPagination />
    </div>
  )
}
