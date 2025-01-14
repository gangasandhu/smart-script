import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import CodeRoom from './pages/CodeRoom'
import Chat from './pages/Chat'
import Header from './components/Header'
import Footer from './components/Footer'
import Documentation from './pages/Documentation'
import Team from './pages/Team'
import { useUser } from './context/UserContext'
import Register from './pages/Register'
import { getAuthUser } from './api/auth'
import Login from './pages/Login'

function App() {

  const { user, setUser } = useUser()
  const [mainTheme, setMainTheme] = useState("vs-dark")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthUser = async () => {
      const data = await getAuthUser()
      setUser(data)
      setLoading(false)
    }
    fetchAuthUser()
  }, [])


  const handleMainTheme = (target) => {
    setMainTheme(target.checked ? "light" : "vs-dark")
  }

  const changeMainTheme = (th) => {
    setMainTheme(th)
  }

  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <div className={`min-h-screen ${mainTheme === 'light' ? 'bg-gray-100' : 'bg-neutral-900'}`}>
    <Router>
      <Header theme={mainTheme} changeMainTheme={handleMainTheme} />
      <main>
        <Routes>
          <Route path='/' element={<Home theme={mainTheme} />} />
          <Route path="/editor/:roomId" element={<CodeRoom mainTheme={mainTheme} changeMainTheme={changeMainTheme} />} />
          <Route path="/register" element={<Register theme={mainTheme} />} />
          <Route path="/login" element={<Login theme={mainTheme} />} />
          <Route path="/chat" element={<Chat mainTheme={mainTheme}/>} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
      <Footer theme={mainTheme}/>
    </Router>
    </div>
  )
}

export default App
