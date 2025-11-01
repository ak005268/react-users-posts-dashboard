import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-tight">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">Page not found</p>
      <p className="mt-2 text-gray-500 text-center">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-md bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
