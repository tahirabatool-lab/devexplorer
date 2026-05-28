// src/services/remoteok.js
import axios from 'axios'

// RemoteOK requires a User-Agent header or it blocks the request.
// We use a CORS proxy since RemoteOK doesn't support browser CORS directly.
export const getJobs = async () => {
  const { data } = await axios.get(
    'https://remoteok.com/api',
    {
      headers: { 'User-Agent': 'DevExplorer/1.0' },
      timeout: 15000,
    }
  )
  // The first item is metadata, actual jobs start from index 1
  return data.slice(1).filter(job => job.position)
}