function DatasetAnalysis({ analysisData }) {
  // Helper function to get type-specific background color
  const getTypeColor = (type) => {
    const colors = {
      continuous: 'bg-blue-100 text-blue-800',
      binary: 'bg-green-100 text-green-800', 
      ordinal: 'bg-purple-100 text-purple-800',
      nominal: 'bg-orange-100 text-orange-800',
      datetime: 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to format values nicely
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      return Number.isInteger(value) ? value.toString() : value.toFixed(2);
    }
    return String(value);
  };

  // Helper function to format statistic keys nicely
  const formatStatKey = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!analysisData) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dataset Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Column Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Missing Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unique Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistics
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(analysisData).map(([column, details], index) => (
                <tr key={column} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {column}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(details?.type)}`}>
                      {details?.type || 'unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {details?.missing_values?.percentage 
                      ? `${details.missing_values.percentage.toFixed(2)}%`
                      : 'N/A'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {details?.unique_values?.count ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {details?.unique_values?.examples?.slice(0, 3).map((example, i) => (
                        <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
                          {formatValue(example)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {details?.statistics && (
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(details.statistics)
                          .filter(([key, value]) => value !== null && value !== undefined)
                          .map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                              <span className="text-xs font-medium text-gray-600">{formatStatKey(key)}:</span>
                              <span className="text-xs">
                                {typeof value === 'object' 
                                  ? JSON.stringify(value).slice(0, 15) + '...'
                                  : formatValue(value)
                                }
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DatasetAnalysis;