import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GanttChartSquare } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden flex-1 bg-gradient-to-br from-primary-600 to-primary-800 lg:block">
        <div className="flex h-full items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-white"
          >
            <div className="mb-8 flex items-center gap-2">
              <GanttChartSquare size={40} className="text-white" />
              <h1 className="text-3xl font-semibold">InsightCRM</h1>
            </div>
            <h2 className="mb-6 text-4xl font-semibold leading-tight">
              Intelligent customer engagement for modern businesses
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-primary-100">
              Segment your audience, create personalized campaigns, and gain valuable insights to grow your business.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-medium">Smart Segmentation</h3>
                <p className="text-primary-100">
                  Create precise audience segments with our intuitive rule builder.
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-medium">AI-Powered Insights</h3>
                <p className="text-primary-100">
                  Leverage AI to optimize your campaigns and drive better results.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;