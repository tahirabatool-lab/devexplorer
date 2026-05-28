// src/utils/validators.js
// Returns an error message string if invalid, or null if valid
export const validateSearchInput = (input) => {
  if (!input || input.trim() === '') {
    return 'Please enter a search term.'
  }
  if (input.trim().length < 2) {
    return 'Search term must be at least 2 characters.'
  }
  return null
}