import { useState, useEffect } from 'react';
import { DownloadCloud, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Components
import CampaignList from '../../components/campaigns/CampaignList';

// Types and services
import { Campaign } from '../../types/campaign';
import { fetchRecentCampaigns, generateAICampaignSummary } from '../../services/mockDataService';

const CampaignHistoryPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  
  // Load campaigns on component mount
  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true);
      
      try {
        const data = await fetchRecentCampaigns();
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (error) {
        console.error('Error loading campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCampaigns();
  }, []);

  // Filter campaigns when search query or status filter changes
  useEffect(() => {
    let filtered = campaigns;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((campaign) => campaign.status === statusFilter);
    }
    
    setFilteredCampaigns(filtered);
  }, [searchQuery, statusFilter, campaigns]);

  // Generate AI summary when a campaign is selected
  useEffect(() => {
    if (selectedCampaign) {
      const generateSummary = async () => {
        setIsGeneratingSummary(true);
        
        try {
          const summary = await generateAICampaignSummary(selectedCampaign);
          setAiSummary(summary);
        } catch (error) {
          console.error('Error generating campaign summary:', error);
        } finally {
          setIsGeneratingSummary(false);
        }
      };
      
      generateSummary();
    }
  }, [selectedCampaign]);

  const handleCampaignSelect = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
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
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">Campaign History</h1>
          <p className="mt-1 text-gray-500">View and analyze your past and ongoing campaigns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="relative max-w-xs flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campaigns..."
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="sending">Sending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 px-4">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`cursor-pointer py-4 transition-colors hover:bg-gray-50 ${
                      selectedCampaign?.id === campaign.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => handleCampaignSelect(campaign)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-medium text-gray-900">
                          {campaign.name}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>
                            Created on{' '}
                            {new Date(campaign.createdAt).toLocaleDateString()}
                          </span>
                          <span className="mx-1">•</span>
                          <span>
                            {campaign.audienceSize.toLocaleString()} recipients
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex flex-shrink-0 items-center space-x-4">
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          campaign.status === 'completed'
                            ? 'bg-success-100 text-success-800'
                            : campaign.status === 'sending'
                            ? 'bg-primary-100 text-primary-800'
                            : campaign.status === 'failed'
                            ? 'bg-error-100 text-error-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
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
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No campaigns found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-4">
            <h2 className="font-semibold text-gray-800">Campaign Details</h2>
          </div>
          
          {selectedCampaign ? (
            <div className="space-y-4 p-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedCampaign.name}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span>
                    Created on{' '}
                    {new Date(selectedCampaign.createdAt).toLocaleDateString()}
                  </span>
                  {selectedCampaign.completedAt && (
                    <>
                      <span className="mx-1">•</span>
                      <span>
                        Completed on{' '}
                        {new Date(selectedCampaign.completedAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Delivery Statistics</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-md bg-gray-50 p-3">
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedCampaign.audienceSize.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Recipients</div>
                  </div>
                  
                  <div className="rounded-md bg-success-50 p-3">
                    <div className="text-lg font-semibold text-success-700">
                      {selectedCampaign.deliveredCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-success-600">Delivered</div>
                  </div>
                  
                  <div className="rounded-md bg-error-50 p-3">
                    <div className="text-lg font-semibold text-error-700">
                      {selectedCampaign.failedCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-error-600">Failed</div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-gray-50 p-4">
                <div className="flex items-center">
                  <div className="mr-3 flex-shrink-0">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                      <span className="text-sm font-medium text-primary-800">AI</span>
                    </span>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">AI Campaign Analysis</h4>
                    {isGeneratingSummary ? (
                      <div className="mt-1 text-sm text-gray-500">Generating insights...</div>
                    ) : (
                      <div className="mt-1 text-sm text-gray-600">{aiSummary}</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Actions</h4>
                <div className="flex space-x-2">
                  <button className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Duplicate
                  </button>
                  <button className="flex-1 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-3">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No campaign selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a campaign from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignHistoryPage;