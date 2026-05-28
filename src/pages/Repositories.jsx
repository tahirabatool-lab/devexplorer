// src/pages/Repositories.jsx
import { useState } from 'react'
import { searchRepositories } from '../services/github'
import { validateSearchInput } from '../utils/validators'
import useDebounce from '../hooks/useDebounce'
import RepoCard from '../components/RepoCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import SkeletonCard from '../components/SkeletonCard'

const LANGUAGES = ['', 'JavaScript', 'Python', 'TypeScript', 'Go', 'Rust', 'Java']
const SORTS = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Recently updated' },
]

const Repositories = () => {
  const [query, setQuery] = useState('react')
  const [language, setLanguage] = useState('')
  const [sort, setSort] = useState('stars')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState(null)

  const debouncedQuery = useDebounce(query, 600)

  const fetchRepos = async (q = debouncedQuery) => {
    const validationError = validateSearchInput(q)
    if (validationError) {
      setInputError(validationError)
      return
    }
    setInputError(null)
    setLoading(true)
    setError(null)
    try {
      const data = await searchRepositories(q, sort, language)
      setRepos(data)
    } catch (err) {
      setError('Unable to fetch repositories. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Trigger search when debounced query changes
  useState(() => { if (debouncedQuery) fetchRepos(debouncedQuery) }, [debouncedQuery, sort, language])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchRepos(query)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Repository Explorer</h1>

      {/* Search + Filters */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setInputError(null) }}
          placeholder="Search repositories..."
          className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
        >
          <option value="">All languages</option>
          {LANGUAGES.filter(Boolean).map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
        >
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
        >
          Search
        </button>
      </form>

      {inputError && <p className="text-red-500 dark:text-red-400 text-sm mb-4">{inputError}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchRepos(query)} />
      ) : repos.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-500 text-center py-16">No repositories found. Try a different search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      )}
    </div>
  )
}

export default Repositories