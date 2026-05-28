// src/components/RepoCard.jsx
import { FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa'
import { formatNumber } from '../utils/formatters'

const RepoCard = ({ repo }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 flex flex-col gap-3 hover:bg-gray-200 dark:hover:bg-gray-750 border border-gray-300 dark:border-gray-700 hover:border-indigo-500 transition">
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-gray-900 dark:text-white font-semibold text-base leading-snug">{repo.full_name}</h3>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition shrink-0"
        aria-label="Open repository"
      >
        <FaExternalLinkAlt size={14} />
      </a>
    </div>

    {repo.description && (
      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{repo.description}</p>
    )}

    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mt-auto">
      {repo.language && (
        <span className="bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full">{repo.language}</span>
      )}
      <span className="flex items-center gap-1">
        <FaStar className="text-yellow-400" /> {formatNumber(repo.stargazers_count)}
      </span>
      <span className="flex items-center gap-1">
        <FaCodeBranch className="text-green-400" /> {formatNumber(repo.forks_count)}
      </span>
    </div>
  </div>
)

export default RepoCard