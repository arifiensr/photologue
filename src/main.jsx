import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './config/GlobalState'
import ScrollToTop from './config/ScrollToTop'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </GlobalProvider>
  // </React.StrictMode>
)
