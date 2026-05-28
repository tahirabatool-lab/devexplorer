import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import useTheme from './hooks/useTheme'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Repositories from './pages/Repositories'
import Articles from './pages/Articles'
import Jobs from './pages/Jobs'

const App = () => {
  const { isDark } = useTheme()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
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