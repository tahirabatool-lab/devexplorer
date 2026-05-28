// src/pages/Articles.jsx
import { useState, useEffect } from 'react'
import { getArticles } from '../services/devto'
import ArticleCard from '../components/ArticleCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import SkeletonCard from '../components/SkeletonCard'

const TAGS = ['', 'javascript', 'python', 'webdev', 'react', 'beginners', 'devops', 'ai']

const Articles = () => {
  const [tag, setTag] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchArticles = async (selectedTag) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getArticles(selectedTag, 12)
      setArticles(data)
    } catch (err) {
      setError('Unable to load articles. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchArticles(tag) }, [tag])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Developer Articles</h1>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TAGS.map(t => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              tag === t
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {t || 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchArticles(tag)} />
      ) : articles.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No articles found for this tag.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  )
}

export default Articles