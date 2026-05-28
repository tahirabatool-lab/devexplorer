// src/services/devto.js
import axios from 'axios'

const BASE = 'https://dev.to/api'

// Fetches articles, optionally filtered by tag
export const getArticles = async (tag = '', perPage = 12) => {
  const params = { per_page: perPage }
  if (tag) params.tag = tag

  const { data } = await axios.get(`${BASE}/articles`, {
    params,
    timeout: 10000,
  })
  return data
}

// Fetches latest articles for homepage preview
export const getLatestArticles = async () => {
  return getArticles('', 4)
}