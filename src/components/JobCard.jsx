// src/components/JobCard.jsx
import { FaHeart, FaRegHeart, FaExternalLinkAlt } from 'react-icons/fa'

const JobCard = ({ job, isSaved, onToggleSave }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 flex flex-col gap-3 border border-gray-300 dark:border-gray-700 hover:border-indigo-500 transition">
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3 className="text-gray-900 dark:text-white font-semibold text-base">{job.position}</h3>
        <p className="text-indigo-600 dark:text-indigo-300 text-sm">{job.company}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onToggleSave(job.id)}
          className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
        >
          {isSaved ? <FaHeart className="text-red-500 dark:text-red-400" /> : <FaRegHeart />}
        </button>
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            aria-label="View job"
          >
            <FaExternalLinkAlt size={14} />
          </a>
        )}
      </div>
    </div>

    {job.description && (
      <p
        className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    )}

    <div className="flex flex-wrap gap-2 mt-auto">
      {job.tags?.slice(0, 4).map(tag => (
        <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{tag}</span>
      ))}
    </div>

    {job.salary && (
      <p className="text-green-400 text-sm font-medium">{job.salary}</p>
    )}
  </div>
)

export default JobCard