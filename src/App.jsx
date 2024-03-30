import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Chat from './pages/Chat'
import 'bootswatch/dist/darkly/bootstrap.min.css' 
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
          <Route path="smart-script/" element={<Home />} />
          <Route path="smart-script/chat" element={<Chat />} />
          <Route path="smart-script/docs" element={<Documentation />} />
          <Route path="smart-script/team" element={<Team />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App
