import { motion } from 'framer-motion';

interface AIMessageSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const AIMessageSuggestions = ({
  suggestions,
  onSelectSuggestion,
}: AIMessageSuggestionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="mt-4 space-y-3"
    >
      <h4 className="text-sm font-medium text-gray-700">AI-generated message suggestions:</h4>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-md border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md"
          >
            <p className="mb-2 text-sm text-gray-800">{suggestion}</p>
            <button
              onClick={() => onSelectSuggestion(suggestion)}
              className="text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              Use this message
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIMessageSuggestions;