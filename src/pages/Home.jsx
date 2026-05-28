// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { getTrendingRepos } from '../services/github'
import { getLatestArticles } from '../services/devto'
import useFetch from '../hooks/useFetch'
import RepoCard from '../components/RepoCard'
import ArticleCard from '../components/ArticleCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import SkeletonCard from '../components/SkeletonCard'

const Home = () => {
  const { data: repos, loading: reposLoading, error: reposError } = useFetch(getTrendingRepos, [])
  const { data: articles, loading: articlesLoading, error: articlesError } = useFetch(getLatestArticles, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Developer Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Explore trending repositories, developer articles, and remote jobs — all in one place.
        </p>
      </div>

      {/* Trending Repositories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Trending Repositories</h2>
          <Link to="/repositories" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm transition">View all →</Link>
        </div>
        {reposLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : reposError ? (
          <ErrorMessage message="Unable to load trending repositories." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos?.slice(0, 3).map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        )}
      </section>

      {/* Latest Articles */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Latest Articles</h2>
          <Link to="/articles" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm transition">View all →</Link>
        </div>
        {articlesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : articlesError ? (
          <ErrorMessage message="Unable to load articles." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles?.slice(0, 2).map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home