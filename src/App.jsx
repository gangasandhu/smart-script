import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Chat from './pages/Chat'
import 'bootswatch/dist/materia/bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Documentation from './pages/Documentation'
import Team from './pages/Team'



function App() {
  const [mainTheme, setMainTheme] = useState("vs-dark")

  const handleMainTheme = (target) => {
    setMainTheme(target.checked ? "light" : "vs-dark")
  }

  const changeMainTheme = (th) => {
    setMainTheme(th)
  }

  useEffect(() => {
    if (mainTheme == 'light')
      document.querySelector('body').style.backgroundColor = "#EEEEEE";
    else
      document.querySelector('body').style.backgroundColor = "#242424";

  }, [mainTheme])


  return (
    <Router>
      <Header theme={mainTheme} changeMainTheme={handleMainTheme} />
      <main>
        <Routes>
          <Route path="smart-script/" element={<Home mainTheme={mainTheme} changeMainTheme={changeMainTheme} />} />
          <Route path="smart-script/chat" element={<Chat mainTheme={mainTheme}/>} />
          <Route path="smart-script/docs" element={<Documentation />} />
          <Route path="smart-script/team" element={<Team />} />
        </Routes>
      </main>

      <Footer theme={mainTheme}/>
    </Router>
  )
}

export default App
