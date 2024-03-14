import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Chat from './pages/Chat'
import './styles/darkly.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Documentation from './pages/Documentation'
import Team from './pages/Team'



function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App
