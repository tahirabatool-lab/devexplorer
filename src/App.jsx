// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Repositories from './pages/Repositories'
import Articles from './pages/Articles'
import Jobs from './pages/Jobs'

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-gray-950 text-white">
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

export default App