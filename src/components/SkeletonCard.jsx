// src/components/SkeletonCard.jsx
// Pulse placeholder shown while data is loading — better UX than just a spinner
const SkeletonCard = () => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 animate-pulse">
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4" />
    <div className="flex gap-4">
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16" />
    </div>
  </div>
)

export default SkeletonCard