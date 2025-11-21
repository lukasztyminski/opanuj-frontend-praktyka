import { useMemo } from 'react';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { getStatusColor } from '../utils/statusColors';

const StatusStats = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useUsersQuery();

  const statusCounts = useMemo(
    () =>
      users.reduce((acc: Record<string, number>, user) => {
        acc[user.status] = (acc[user.status] || 0) + 1;
        return acc;
      }, {}),
    [users]
  );

  if (isLoading) return <div>Loading stats...</div>;
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {Object.entries(statusCounts).map(([status, count]) => (
        <div
          key={status}
          className="bg-white rounded-lg shadow p-4"
          data-testid="status-stats-item"
        >
          <div className="flex flex-col items-center">
            <span
              className={`px-2 py-1 rounded-lg text-sm font-medium mb-2 ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
            <span className="text-2xl font-bold">{count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusStats;
