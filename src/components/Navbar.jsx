import { Link, useLocation } from 'react-router-dom'
import { FaCode, FaSun, FaMoon } from 'react-icons/fa'
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

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition">
          <FaCode />
          DevExplorer
        </Link>
        <div className="flex items-center gap-2">
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
      </div>
    </nav>
  )
}

export default Navbar