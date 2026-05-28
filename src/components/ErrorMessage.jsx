// src/components/ErrorMessage.jsx
import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorMessage = ({ message = 'Unable to fetch data. Please try again later.', onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
    <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-4xl" />
    <p className="text-gray-600 dark:text-gray-300 text-base max-w-md">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm transition"
      >
        Try again
      </button>
    )}
  </div>
)

export default ErrorMessage