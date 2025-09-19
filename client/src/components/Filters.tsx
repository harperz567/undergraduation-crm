// components/Filters.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow mb-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="Exploring">Exploring</option>
            <option value="Shortlisting">Shortlisting</option>
            <option value="Applying">Applying</option>
            <option value="Submitted">Submitted</option>
          </select>
        </div>
        <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
          <Filter className="h-4 w-4 mr-2" />
          Quick Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;