export const formatNumber = (num) => {
  if (!num) return '0'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

export const readingTime = (text) => {
  if (!text) return '1 min read'
  const words = text.split(' ').length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}