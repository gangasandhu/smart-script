import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import CodeRoom from './pages/CodeRoom'
import Chat from './pages/Chat'
import 'bootswatch/dist/materia/bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Documentation from './pages/Documentation'
import Team from './pages/Team'
import { useUser } from './context/UserContext'
import Register from './pages/Register'

function App() {

  const { user, setUser } = useUser()
  const [mainTheme, setMainTheme] = useState("vs-dark")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setUser(user)
    }
    setLoading(false)

  }, [])


  useEffect(() => {
    if (mainTheme == 'light')
      document.querySelector('body').style.backgroundColor = "#EEEEEE";
    else
      document.querySelector('body').style.backgroundColor = "#242424";

  }, [mainTheme])



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
    <Router>
      <Header theme={mainTheme} changeMainTheme={handleMainTheme} />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/editor/:roomId" element={<CodeRoom mainTheme={mainTheme} changeMainTheme={changeMainTheme} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat mainTheme={mainTheme}/>} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
      <Footer theme={mainTheme}/>
    </Router>
  )
}

export default App
