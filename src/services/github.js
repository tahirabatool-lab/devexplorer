// src/services/github.js
import axios from 'axios'

const BASE = 'https://api.github.com'

// Searches GitHub repositories by query with a 10-second timeout
export const searchRepositories = async (query, sort = 'stars', language = '') => {
  let q = query
  if (language) q += `+language:${language}`

  const { data } = await axios.get(`${BASE}/search/repositories`, {
    params: { q, sort, order: 'desc', per_page: 20 },
    timeout: 10000,
  })
  return data.items
}

// Fetches trending repos (popular JavaScript repos as default trending)
export const getTrendingRepos = async () => {
  const { data } = await axios.get(`${BASE}/search/repositories`, {
    params: {
      q: 'stars:>10000',
      sort: 'stars',
      order: 'desc',
      per_page: 6,
    },
    timeout: 10000,
  })
  return data.items
}