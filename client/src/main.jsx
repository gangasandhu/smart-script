import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { UserProvider } from './context/UserContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import 'bootstrap/dist/js/bootstrap.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <UserProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </UserProvider>
  </React.StrictMode>,
)
