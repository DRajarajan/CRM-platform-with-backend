import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

// Components
import SegmentSelector from '../../components/segments/SegmentSelector';
import MessageEditor from '../../components/campaigns/MessageEditor';
import AIMessageSuggestions from '../../components/campaigns/AIMessageSuggestions';

// Services and types
import { CampaignSegment } from '../../types/campaign';
import { fetchSegments, generateAIMessageSuggestions } from '../../services/mockDataService';

const CampaignPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [segments, setSegments] = useState<CampaignSegment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<CampaignSegment | null>(null);
  const [campaignName, setCampaignName] = useState('');
  const [message, setMessage] = useState('');
  const [objective, setObjective] = useState('');
  const [messageSuggestions, setMessageSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  // Fetch segments on component mount
  useEffect(() => {
    const loadSegments = async () => {
      try {
        const data = await fetchSegments();
        setSegments(data);
      } catch (error) {
        console.error('Error loading segments:', error);
      }
    };
    
    loadSegments();
  }, []);

  const handleSegmentSelect = (segment: CampaignSegment) => {
    setSelectedSegment(segment);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleGenerateSuggestions = async () => {
    if (!selectedSegment || !objective) return;
    
    setIsGeneratingSuggestions(true);
    
    try {
      const suggestions = await generateAIMessageSuggestions(
        selectedSegment.name,
        objective
      );
      
      setMessageSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating message suggestions:', error);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleCreateCampaign = async () => {
    if (!selectedSegment || !campaignName || !message) return;
    
    setIsCreatingCampaign(true);
    
    try {
      // In a real app, we would make an API call to create the campaign
      // For this demo, we'll just simulate a delay and navigate to the history page
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      navigate('/campaigns/history');
    } catch (error) {
      console.error('Error creating campaign:', error);
      setIsCreatingCampaign(false);
    }
  };

  const isNextButtonDisabled = () => {
    if (step === 1) {
      return !selectedSegment;
    } else if (step === 2) {
      return !campaignName || !message;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">Create Campaign</h1>
            <p className="mt-1 text-gray-500">Send personalized messages to your targeted audience</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-b border-gray-200 pb-4">
        <div
          className={`flex items-center ${
            step >= 1 ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
          >
            1
          </div>
          <span className="ml-2 text-sm font-medium">Select Audience</span>
        </div>
        
        <div className="h-0.5 flex-1 self-center bg-gray-200 mx-4">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: step >= 2 ? '100%' : '0%' }}
          />
        </div>
        
        <div
          className={`flex items-center ${
            step >= 2 ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
          >
            2
          </div>
          <span className="ml-2 text-sm font-medium">Compose Message</span>
        </div>
        
        <div className="h-0.5 flex-1 self-center bg-gray-200 mx-4">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: step >= 3 ? '100%' : '0%' }}
          />
        </div>
        
        <div
          className={`flex items-center ${
            step >= 3 ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'
            }`}
          >
            3
          </div>
          <span className="ml-2 text-sm font-medium">Review & Send</span>
        </div>
      </div>

      <motion.div
        key={`step-${step}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border border-gray-200 bg-white shadow-sm"
      >
        {step === 1 && (
          <div className="p-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Select Target Audience</h2>
            <SegmentSelector
              segments={segments}
              selectedSegment={selectedSegment}
              onSegmentSelect={handleSegmentSelect}
            />
          </div>
        )}
        
        {step === 2 && (
          <div className="p-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Compose Your Message</h2>
            
            <div className="mb-6">
              <label htmlFor="campaignName" className="mb-2 block text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Summer Sale Promotion"
                className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="objective" className="mb-2 block text-sm font-medium text-gray-700">
                Campaign Objective
              </label>
              <select
                id="objective"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Select an objective</option>
                <option value="reactivate">Reactivate dormant customers</option>
                <option value="promote">Promote a new product/service</option>
                <option value="inform">Share important information</option>
                <option value="loyalty">Reward loyal customers</option>
                <option value="feedback">Request customer feedback</option>
              </select>
            </div>
            
            <div className="mb-4 flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-accent-500" />
              <h3 className="text-md font-medium text-gray-900">AI Message Suggestions</h3>
            </div>
            
            <div className="mb-6">
              <button
                onClick={handleGenerateSuggestions}
                disabled={!selectedSegment || !objective || isGeneratingSuggestions}
                className="rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isGeneratingSuggestions ? 'Generating...' : 'Generate Message Ideas'}
              </button>
              
              {messageSuggestions.length > 0 && (
                <AIMessageSuggestions
                  suggestions={messageSuggestions}
                  onSelectSuggestion={handleSelectSuggestion}
                />
              )}
            </div>
            
            <MessageEditor
              value={message}
              onChange={setMessage}
              placeholder="Write your message here..."
            />
          </div>
        )}
        
        {step === 3 && (
          <div className="p-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Review & Send</h2>
            
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Campaign Name</h3>
                <p className="text-lg text-gray-900">{campaignName}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Target Audience</h3>
                <div className="mt-1 flex items-center">
                  <p className="text-lg text-gray-900">{selectedSegment?.name}</p>
                  <div className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                    {selectedSegment?.audienceSize.toLocaleString()} customers
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="mt-1 whitespace-pre-wrap text-lg text-gray-900">{message}</p>
              </div>
            </div>
            
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              <p>
                <span className="font-medium">Note:</span> This campaign will be sent to all{' '}
                {selectedSegment?.audienceSize.toLocaleString()} customers in the "{selectedSegment?.name}" segment.
                The delivery will be processed immediately after you click the Send button.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex justify-between">
        <button
          onClick={handlePreviousStep}
          disabled={step === 1}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
        
        {step < 3 ? (
          <button
            onClick={handleNextStep}
            disabled={isNextButtonDisabled()}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleCreateCampaign}
            disabled={isCreatingCampaign}
            className="flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="mr-2 h-4 w-4" />
            {isCreatingCampaign ? 'Sending...' : 'Send Campaign'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;