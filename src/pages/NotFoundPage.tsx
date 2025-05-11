import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center"
    >
      <div className="mb-6 rounded-full bg-primary-100 p-4">
        <AlertCircle size={48} className="text-primary-600" />
      </div>
      <h1 className="mb-2 text-4xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mb-8 max-w-md text-lg text-gray-600">
        We couldn't find the page you're looking for. The page might have been moved or deleted.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-md border border-gray-300 bg-white px-5 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-md bg-primary-600 px-5 py-2 font-medium text-white shadow-sm transition hover:bg-primary-700"
        >
          Go to Dashboard
        </button>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;