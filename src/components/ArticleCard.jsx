import { FaHeart, FaExternalLinkAlt } from 'react-icons/fa'
import { readingTime, formatDate } from '../utils/formatters'

const ArticleCard = ({ article }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 flex flex-col gap-3 border border-gray-300 dark:border-gray-700 hover:border-indigo-500 transition">
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-gray-900 dark:text-white font-semibold text-base leading-snug line-clamp-2">{article.title}</h3>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition shrink-0"
        aria-label="Read article"
      >
        <FaExternalLinkAlt size={14} />
      </a>
    </div>

    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{article.description}</p>

    <div className="flex flex-wrap items-center gap-2 mt-auto">
      {article.tag_list?.slice(0, 3).map(tag => (
        <span key={tag} className="bg-teal-900 text-teal-300 text-xs px-2 py-0.5 rounded-full">#{tag}</span>
      ))}
    </div>

    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-500">
      <span>{formatDate(article.published_at)}</span>
      <div className="flex items-center gap-3">
        <span>{readingTime(article.body_markdown)}</span>
        <span className="flex items-center gap-1">
          <FaHeart className="text-red-400" /> {article.positive_reactions_count}
        </span>
      </div>
    </div>
  </div>
)

export default ArticleCard