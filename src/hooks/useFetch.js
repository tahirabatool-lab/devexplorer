// src/hooks/useFetch.js
import { useState, useEffect } from 'react'

// Generic data-fetching hook with loading + error state built in.
// Usage: const { data, loading, error } = useFetch(fetchFn, deps)
const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchFunction()
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Something went wrong.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    // Cleanup: ignore stale responses if component unmounts
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error }
}

export default useFetch