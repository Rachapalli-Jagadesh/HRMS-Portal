import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="text-center max-w-md">
                {/* Dummy image from unDraw */}
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small_2x/404-landing-page-free-vector.jpg"
                    alt="404 Illustration"
                    className="mx-auto h-64 mb-6"
                />

                <h1 className="text-5xl font-bold text-blue-900 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )

}

export default NotFound;