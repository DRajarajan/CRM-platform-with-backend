import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Check,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Trash,
  Edit,
  Star
} from 'lucide-react';

// Services and types
import { fetchCustomers } from '../../services/mockDataService';
import { Customer } from '../../types/campaign';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Customer>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Load customers on component mount
  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error('Error loading customers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCustomers();
  }, []);

  // Filter customers when search query changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCustomers(customers);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        (customer.phone && customer.phone.includes(query))
    );
    
    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

  // Sort customers when sort parameters change
  useEffect(() => {
    const sorted = [...filteredCustomers].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
      if (bValue === undefined) return sortDirection === 'asc' ? 1 : -1;
      
      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
    
    setFilteredCustomers(sorted);
  }, [sortField, sortDirection]);

  const handleSortChange = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      return 'Today';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months ago`;
    } else {
      return `${Math.floor(diffDays / 365)} years ago`;
    }
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
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">Customers</h1>
          <p className="mt-1 text-gray-500">Manage and view your customer database</p>
        </div>
        
        <div className="mt-4 flex space-x-3 md:mt-0">
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Download className="mr-2 inline h-4 w-4" />
            Export
          </button>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3">
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
                    placeholder="Search customers..."
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {filteredCustomers.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        <button
                          onClick={() => handleSortChange('name')}
                          className="group inline-flex items-center"
                        >
                          Customer
                          {sortField === 'name' && (
                            <span className="ml-1 text-gray-400 group-hover:text-gray-500">
                              {sortDirection === 'asc' ? (
                                <ArrowUp className="h-4 w-4" />
                              ) : (
                                <ArrowDown className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        <button
                          onClick={() => handleSortChange('totalSpend')}
                          className="group inline-flex items-center"
                        >
                          Total Spend
                          {sortField === 'totalSpend' && (
                            <span className="ml-1 text-gray-400 group-hover:text-gray-500">
                              {sortDirection === 'asc' ? (
                                <ArrowUp className="h-4 w-4" />
                              ) : (
                                <ArrowDown className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        <button
                          onClick={() => handleSortChange('visitCount')}
                          className="group inline-flex items-center"
                        >
                          Visits
                          {sortField === 'visitCount' && (
                            <span className="ml-1 text-gray-400 group-hover:text-gray-500">
                              {sortDirection === 'asc' ? (
                                <ArrowUp className="h-4 w-4" />
                              ) : (
                                <ArrowDown className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        <button
                          onClick={() => handleSortChange('lastActivity')}
                          className="group inline-flex items-center"
                        >
                          Last Activity
                          {sortField === 'lastActivity' && (
                            <span className="ml-1 text-gray-400 group-hover:text-gray-500">
                              {sortDirection === 'asc' ? (
                                <ArrowUp className="h-4 w-4" />
                              ) : (
                                <ArrowDown className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tags
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredCustomers.map((customer) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                                {customer.name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {customer.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {customer.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {formatCurrency(customer.totalSpend)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {customer.visitCount}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {formatDate(customer.lastActivity)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex space-x-1">
                            {customer.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                  tag === 'vip'
                                    ? 'bg-accent-100 text-accent-800'
                                    : tag === 'new-customer'
                                    ? 'bg-success-100 text-success-800'
                                    : tag === 'inactive'
                                    ? 'bg-error-100 text-error-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="relative inline-block text-left">
                            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No customers found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;