import { SegmentRule } from '../../types/campaign';

interface RuleBuilderProps {
  rule: SegmentRule;
  onChange: (rule: SegmentRule) => void;
}

const RuleBuilder = ({ rule, onChange }: RuleBuilderProps) => {
  // Field options for the rule builder
  const fieldOptions = [
    { value: 'totalSpend', label: 'Total Spend' },
    { value: 'lastActivity', label: 'Days Since Last Activity' },
    { value: 'visitCount', label: 'Visit Count' },
    { value: 'createdAt', label: 'Days Since Signup' },
  ];
  
  // Operator options
  const operatorOptions = [
    { value: '>', label: 'greater than' },
    { value: '<', label: 'less than' },
    { value: '=', label: 'equals' },
    { value: '>=', label: 'greater than or equal to' },
    { value: '<=', label: 'less than or equal to' },
    { value: '!=', label: 'not equal to' },
  ];

  // Handle field change
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...rule,
      field: e.target.value,
    });
  };

  // Handle operator change
  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...rule,
      operator: e.target.value,
    });
  };

  // Handle value change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...rule,
      value: e.target.value,
    });
  };

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
      <div className="w-full sm:w-1/3">
        <select
          value={rule.field}
          onChange={handleFieldChange}
          className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {fieldOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="w-full sm:w-1/3">
        <select
          value={rule.operator}
          onChange={handleOperatorChange}
          className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {operatorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="w-full sm:w-1/3">
        <input
          type="text"
          value={rule.value}
          onChange={handleValueChange}
          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder={
            rule.field === 'totalSpend'
              ? 'Amount (e.g., 1000)'
              : rule.field === 'lastActivity' || rule.field === 'createdAt'
              ? 'Days (e.g., 30)'
              : 'Value'
          }
        />
      </div>
    </div>
  );
};

export default RuleBuilder;