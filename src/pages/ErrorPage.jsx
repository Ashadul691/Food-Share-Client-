import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          {error?.status || 404} - {error?.statusText || 'Page Not Found'}
        </p>
        <p className="text-gray-600 mb-8">
          {error?.data ||
            "The page you're looking for doesn't exist or an error occurred."}
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-[#89b758] text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
      <div className="mt-10">
        <img
          src="https://assets.materialup.com/uploads/0ebf2016-0549-457b-84da-eae9f325aa70/preview.jpg"
          alt="Error Illustration"
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default ErrorPage;