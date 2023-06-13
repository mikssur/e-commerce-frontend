import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { App } from '../App'
import { ErrorPage } from '../components/ErrorPage/ErrorPage'
import { LogIn } from '../components/LogIn/LogIn'
import { NotFound } from '../components/NotFound/NotFound'
import { RootLayout } from '../RootLayout/RootLayout'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { CartList } from '../components/Cart/CartList'
import { Checkout } from '../components/Checkout/Checkout'
import { Admin } from '../pages/Admin'
import { AddUpdateForm } from '../components/Admin/AddUpdateForm/AddUpdateForm'
import { CategoriesList } from '../components/Category/CategoryForm'
import { Spinner } from '../common/components/Spinner'

export const RouterWrapper = () => {
  const isAdmin = useSelector((state: RootState) => state.auth.userInfo.role === 'ADMIN')
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)

  const adminCheck = () => {
    if (!isAdmin) return redirect('/')
    return null
  }

  const authCheck = () => {
    if (!loggedIn) return redirect('/login')
    return null
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <App />,
          children: [
            {
              path: 'login',
              element: <LogIn />
            },
            {
              path: 'cart',
              element: <CartList />
            }
          ]
        },

        {
          path: '/admin',
          element: <Admin />,
          loader: adminCheck
        },
        {
          path: '/admin/new',
          element: <AddUpdateForm />,
          loader: adminCheck
        },
        {
          path: '/admin/:id/edit',
          element: <AddUpdateForm />,
          loader: adminCheck
        },
        {
          path: '/admin/category',
          element: <CategoriesList />,
          loader: adminCheck
        },
        {
          path: '/checkout',
          element: <Checkout />,
          loader: authCheck
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return <RouterProvider router={router} fallbackElement={<Spinner />} />
}
