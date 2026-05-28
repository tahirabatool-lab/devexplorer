// src/pages/Jobs.jsx
import { useState, useEffect } from 'react'
import { getJobs } from '../services/remoteok'
import { validateSearchInput } from '../utils/validators'
import JobCard from '../components/JobCard'
import ErrorMessage from '../components/ErrorMessage'
import SkeletonCard from '../components/SkeletonCard'

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [savedJobs, setSavedJobs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedJobs') || '[]') }
    catch { return [] }
  })

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getJobs()
        setAllJobs(data)
        setFiltered(data)
      } catch {
        setError('Unable to load remote jobs. The RemoteOK API may be temporarily unavailable.')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(allJobs)
      return
    }
    const q = search.toLowerCase()
    setFiltered(allJobs.filter(j =>
      j.position?.toLowerCase().includes(q) ||
      j.company?.toLowerCase().includes(q) ||
      j.tags?.some(t => t.toLowerCase().includes(q))
    ))
  }, [search, allJobs])

  const toggleSave = (id) => {
    setSavedJobs(prev => {
      const updated = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      localStorage.setItem('savedJobs', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Remote Developer Jobs</h1>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by role, company, or skill..."
        className="w-full sm:w-96 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 mb-6 focus:outline-none focus:border-indigo-500"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filtered.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-500 text-center py-16">No jobs found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.slice(0, 20).map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Jobs