import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  TrashIcon,
  Save,
  Users,
  Loader2,
} from 'lucide-react';

// Types
import { SegmentRule } from '../../types/campaign';

// Services
import { calculateAudienceSize } from '../../services/mockDataService';

// Components
import RuleBuilder from '../../components/segments/RuleBuilder';

const initialRule: SegmentRule = {
  id: '1',
  field: 'totalSpend',
  operator: '>',
  value: 1000,
};

const SegmentBuilderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const [segmentName, setSegmentName] = useState('');
  const [rules, setRules] = useState<SegmentRule[]>([initialRule]);
  const [audienceSize, setAudienceSize] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // When rules change, calculate audience size
    const calculateSize = async () => {
      if (rules.length === 0) {
        setAudienceSize(0);
        return;
      }
      
      setIsCalculating(true);
      
      try {
        const size = await calculateAudienceSize(rules);
        setAudienceSize(size);
      } catch (error) {
        console.error('Error calculating audience size:', error);
      } finally {
        setIsCalculating(false);
      }
    };
    
    calculateSize();
  }, [rules]);

  const handleAddRule = () => {
    const newRule: SegmentRule = {
      id: `rule-${Date.now()}`,
      field: 'totalSpend',
      operator: '>',
      value: 1000,
      conjunction: rules.length > 0 ? 'AND' : undefined,
    };
    
    setRules([...rules, newRule]);
  };

  const handleRemoveRule = (ruleId: string) => {
    if (rules.length <= 1) {
      return; // Don't remove the last rule
    }
    
    setRules(rules.filter((rule) => rule.id !== ruleId));
  };

  const handleRuleChange = (updatedRule: SegmentRule) => {
    setRules(
      rules.map((rule) => (rule.id === updatedRule.id ? updatedRule : rule))
    );
  };

  const handleConjunctionChange = (ruleId: string, conjunction: 'AND' | 'OR') => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, conjunction } : rule
      )
    );
  };

  const handleSaveSegment = async () => {
    if (!segmentName || rules.length === 0) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, we would make an API call to save the segment
      // For this demo, we'll just simulate a delay and navigate back
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      navigate('/campaigns/new');
    } catch (error) {
      console.error('Error saving segment:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            {isEditing ? 'Edit Segment' : 'Create Segment'}
          </h1>
          <p className="mt-1 text-gray-500">
            Define audience criteria using rules
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <label htmlFor="segmentName" className="mb-2 block text-sm font-medium text-gray-700">
            Segment Name
          </label>
          <input
            type="text"
            id="segmentName"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="e.g., High-Value Customers"
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Segment Rules</h2>
            
            <button
              onClick={handleAddRule}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </button>
          </div>
          
          <div className="rounded-lg border border-gray-200">
            {rules.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No rules defined. Add a rule to get started.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {rules.map((rule, index) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4"
                  >
                    <div className="flex items-start">
                      {index > 0 && (
                        <div className="mr-3 mt-2">
                          <select
                            value={rule.conjunction || 'AND'}
                            onChange={(e) =>
                              handleConjunctionChange(
                                rule.id,
                                e.target.value as 'AND' | 'OR'
                              )
                            }
                            className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                          </select>
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <RuleBuilder
                          rule={rule}
                          onChange={handleRuleChange}
                        />
                      </div>
                      
                      <button
                        onClick={() => handleRemoveRule(rule.id)}
                        disabled={rules.length <= 1}
                        className="ml-3 mt-2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center">
            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
              <Users className="h-5 w-5 text-primary-600" />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">Audience Size</h3>
              {isCalculating ? (
                <div className="flex items-center text-gray-500">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </div>
              ) : (
                <p className="text-2xl font-semibold text-gray-900">
                  {audienceSize === null ? '0' : audienceSize.toLocaleString()}
                  <span className="ml-1 text-sm font-normal text-gray-500">customers</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSaveSegment}
            disabled={!segmentName || rules.length === 0 || isSaving}
            className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Segment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentBuilderPage;