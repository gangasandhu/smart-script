import { useState } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import './styles/darkly.min.css'
import Header from './components/Header'


function App() {

  return (
    <>
      <Header />
      <Home />
    </>
  )
}

export default App
