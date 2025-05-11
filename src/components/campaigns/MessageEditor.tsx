import { useState } from 'react';

interface MessageEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MessageEditor = ({ value, onChange, placeholder }: MessageEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleInsertVariable = (variable: string) => {
    onChange(`${value} {${variable}} `);
  };
  
  return (
    <div
      className={`rounded-lg border transition-all duration-200 ${
        isFocused
          ? 'border-primary-500 ring-1 ring-primary-500'
          : 'border-gray-300'
      }`}
    >
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">Message Content</div>
          <div className="text-xs text-gray-500">
            {value.length} characters
          </div>
        </div>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        rows={6}
        className="w-full resize-none border-0 bg-white p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
      />
      
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-700">Insert:</span>
          <button
            type="button"
            onClick={() => handleInsertVariable('customer.firstName')}
            className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300"
          >
            First Name
          </button>
          <button
            type="button"
            onClick={() => handleInsertVariable('customer.lastName')}
            className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300"
          >
            Last Name
          </button>
          <button
            type="button"
            onClick={() => handleInsertVariable('customer.email')}
            className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300"
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => handleInsertVariable('customer.totalSpend')}
            className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300"
          >
            Total Spend
          </button>
          <button
            type="button"
            onClick={() => handleInsertVariable('customer.lastPurchaseDate')}
            className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300"
          >
            Last Purchase Date
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageEditor;