import { Link, useLocation } from 'react-router-dom'
import { FaCode, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import useTheme from '../hooks/useTheme'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/repositories', label: 'Repositories' },
  { to: '/articles', label: 'Articles' },
  { to: '/jobs', label: 'Jobs' },
]

const Navbar = () => {
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition">
          <FaCode />
          <span className="hidden sm:inline">DevExplorer</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <ul className="flex gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-3 py-2 rounded text-sm font-medium transition ${
                    pathname === to
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="ml-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-yellow-500 dark:text-yellow-400"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-yellow-500 dark:text-yellow-400"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition border-l-4 ${
                    pathname === to
                      ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-600 text-indigo-600 dark:text-indigo-300'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar