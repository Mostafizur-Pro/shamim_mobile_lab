import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Something went wrong. The page you're looking for doesn't exist or has
          been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
