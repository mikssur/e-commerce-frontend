import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterWrapper } from './router/RouterWrapper'

import './index.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_KEY}>
    <Provider store={store}>
      <RouterWrapper />
    </Provider>
  </GoogleOAuthProvider>
)
