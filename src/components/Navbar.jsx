// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom'
import { FaCode } from 'react-icons/fa'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/repositories', label: 'Repositories' },
  { to: '/articles', label: 'Articles' },
  { to: '/jobs', label: 'Jobs' },
]

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-400 hover:text-indigo-300 transition">
          <FaCode />
          DevExplorer
        </Link>
        <ul className="flex gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  pathname === to
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar