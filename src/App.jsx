import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Repositories from './pages/Repositories'
import Articles from './pages/Articles'
import Jobs from './pages/Jobs'

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme !== 'light') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 dark:bg-gray-950 text-white transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repositories" element={<Repositories />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App