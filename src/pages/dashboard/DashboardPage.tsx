import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Send, 
  TrendingUp, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Components
import StatsCard from '../../components/dashboard/StatsCard';
import CampaignList from '../../components/campaigns/CampaignList';
import DashboardChart from '../../components/dashboard/DashboardChart';

// Mock data
import { fetchDashboardStats, fetchRecentCampaigns } from '../../services/mockDataService';
import { Campaign } from '../../types/campaign';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCampaigns: 0,
    deliveryRate: 0,
    avgEngagement: 0,
  });
  
  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
        const statsData = await fetchDashboardStats();
        const campaignsData = await fetchRecentCampaigns();
        
        setStats(statsData);
        setRecentCampaigns(campaignsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome back, view your CRM metrics at a glance</p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0">
          <Link
            to="/segments/new"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Create Segment
          </Link>
          <Link
            to="/campaigns/new"
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            New Campaign
          </Link>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Total Customers"
            value={stats.totalCustomers.toLocaleString()}
            icon={<Users className="h-6 w-6 text-primary-600" />}
            trend={+12.5}
            trendLabel="from last month"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatsCard
            title="Active Campaigns"
            value={stats.activeCampaigns.toString()}
            icon={<Send className="h-6 w-6 text-accent-500" />}
            trend={+3}
            trendLabel="new this week"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatsCard
            title="Delivery Rate"
            value={`${stats.deliveryRate}%`}
            icon={<TrendingUp className="h-6 w-6 text-teal-600" />}
            trend={+1.2}
            trendLabel="from last campaign"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatsCard
            title="Avg. Engagement"
            value={`${stats.avgEngagement}%`}
            icon={<AlertCircle className="h-6 w-6 text-warning-500" />}
            trend={-2.3}
            trendLabel="needs attention"
            negative
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 lg:col-span-2"
        >
          <div className="h-full rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-800">Campaign Performance</h2>
            </div>
            <div className="p-6">
              <DashboardChart />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-800">Recent Campaigns</h2>
            <Link 
              to="/campaigns/history" 
              className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="p-6">
            <CampaignList campaigns={recentCampaigns} limit={5} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;