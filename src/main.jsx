// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// MAIN.JSX

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { store } from "./webapp/store/Store.js";
import { AuthProvider } from './webapp/context/AuthContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>

  <Provider store={store}>
  <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>

  // </StrictMode>
)
