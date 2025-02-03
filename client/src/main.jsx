
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { persistor, store } from './redux/store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import {ThemeContextProvider} from "./context/ThemeContext.jsx"
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>

      <ThemeContextProvider>
        <QueryClientProvider client={new QueryClient()}>
          <App />
        </QueryClientProvider>
      </ThemeContextProvider>
    </PersistGate>
  </Provider>,
)
