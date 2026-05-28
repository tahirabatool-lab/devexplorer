// src/hooks/useDebounce.js
import { useState, useEffect } from 'react'

// Delays updating a value until the user stops typing.
// Prevents firing an API call on every keystroke.
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce