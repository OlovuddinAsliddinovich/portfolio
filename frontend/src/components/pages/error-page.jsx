import { useNavigate } from "react-router-dom";
import Layout from "../layouts/layout";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-[80vh] bg-gray-50 text-center">
        <h1
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600"
          style={{
            backgroundImage: "url('https://via.placeholder.com/800x200?text=Galaxy+Background')",
            backgroundSize: "cover",
            backgroundClip: "text",
          }}
        >
          Oops!
        </h1>
        <p className="text-2xl font-bold text-gray-800 mt-4">404 - PAGE NOT FOUND</p>
        <p className="text-gray-500 mt-2 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          GO TO HOMEPAGE
        </button>
      </div>
    </Layout>
  );
};

export default ErrorPage;
