import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CampaignSegment } from '../../types/campaign';

interface SegmentSelectorProps {
  segments: CampaignSegment[];
  selectedSegment: CampaignSegment | null;
  onSegmentSelect: (segment: CampaignSegment) => void;
}

const SegmentSelector = ({
  segments,
  selectedSegment,
  onSegmentSelect,
}: SegmentSelectorProps) => {
  if (segments.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <PlusCircle className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No segments found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new segment.</p>
        <div className="mt-6">
          <Link
            to="/segments/new"
            className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Create Segment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Select an audience segment for your campaign:
      </p>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => onSegmentSelect(segment)}
              className={`flex h-full w-full flex-col justify-between rounded-lg border p-4 text-left transition-all ${
                selectedSegment?.id === segment.id
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div>
                <h3 className="font-medium text-gray-900">{segment.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {segment.rules.length === 1
                    ? '1 rule defined'
                    : `${segment.rules.length} rules defined`}
                </p>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                  {segment.audienceSize.toLocaleString()} customers
                </div>
                
                <span className="text-xs text-gray-500">
                  Created{' '}
                  {new Date(segment.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </button>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: segments.length * 0.1 }}
        >
          <Link
            to="/segments/new"
            className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400"
          >
            <div className="rounded-full bg-gray-100 p-3">
              <PlusCircle className="h-6 w-6 text-gray-600" />
            </div>
            <span className="mt-2 block font-medium text-gray-900">Create New Segment</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SegmentSelector;