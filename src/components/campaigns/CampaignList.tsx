import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Campaign } from '../../types/campaign';

interface CampaignListProps {
  campaigns: Campaign[];
  limit?: number;
}

const CampaignList = ({ campaigns, limit }: CampaignListProps) => {
  // Apply limit if specified
  const displayedCampaigns = limit ? campaigns.slice(0, limit) : campaigns;
  
  // If no campaigns, show empty state
  if (displayedCampaigns.length === 0) {
    return (
      <div className="py-8 text-center">
        <Send className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new campaign.</p>
        <div className="mt-6">
          <Link
            to="/campaigns/new"
            className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            New Campaign
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'sending':
        return <Send className="h-5 w-5 text-primary-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-error-500" />;
      case 'draft':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status: Campaign['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'sending':
        return 'bg-primary-100 text-primary-800';
      case 'failed':
        return 'bg-error-100 text-error-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {displayedCampaigns.map((campaign, index) => (
        <motion.div
          key={campaign.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="py-4 first:pt-0 last:pb-0"
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-gray-900">
                <Link to={`/campaigns/history?id=${campaign.id}`} className="hover:text-primary-600">
                  {campaign.name}
                </Link>
              </h3>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <span>
                  {format(new Date(campaign.createdAt), 'MMM d, yyyy')}
                </span>
                <span className="mx-1">•</span>
                <span>
                  {campaign.audienceSize.toLocaleString()} recipients
                </span>
              </div>
            </div>
            
            <div className="ml-4 flex flex-shrink-0 items-center space-x-4">
              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(campaign.status)}`}>
                {getStatusIcon(campaign.status)}
                <span className="ml-1 capitalize">{campaign.status}</span>
              </div>
              
              {campaign.status !== 'draft' && (
                <div className="text-xs">
                  <div className="font-medium text-gray-900">
                    {((campaign.deliveredCount / (campaign.audienceSize || 1)) * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-500">Delivered</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CampaignList;