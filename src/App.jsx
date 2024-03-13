import { useState } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import './styles/darkly.min.css'
import Header from './components/Header'
import Footer from './components/Footer'



function App() {

  return (
    <>
      <Header />
    
      <main>
        <Home />
      </main>
    
      <Footer />
    </>
  )
}

export default App
