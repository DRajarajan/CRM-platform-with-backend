import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  negative?: boolean;
}

const StatsCard = ({ title, value, icon, trend, trendLabel, negative = false }: StatsCardProps) => {
  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="rounded-full bg-gray-50 p-2">{icon}</div>
      </div>
      
      <div className="mt-4 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        
        {trend !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`ml-2 flex items-center text-sm font-medium ${
              negative
                ? 'text-error-600'
                : 'text-success-600'
            }`}
          >
            {trend > 0 ? (
              <>
                <TrendingUp className="mr-1 h-4 w-4" />
                {trend}%
              </>
            ) : (
              <>
                <TrendingDown className="mr-1 h-4 w-4" />
                {Math.abs(trend)}%
              </>
            )}
          </motion.div>
        )}
      </div>
      
      {trendLabel && (
        <p className="mt-1 text-xs text-gray-500">{trendLabel}</p>
      )}
    </div>
  );
};

export default StatsCard;