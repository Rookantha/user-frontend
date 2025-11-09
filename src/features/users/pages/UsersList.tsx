import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsersList, useDeleteUser } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import { UserCard } from '../components/UserCard';
import { UserSearch } from '../components/UserSearch';

export const UsersList: React.FC = () => {
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, 400);

  const { data: users, isLoading, error } = useUsersList(debouncedTerm);
  const deleteMutation = useDeleteUser();

  const onDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            👥 User Management
          </h2>

          <Link
            to="/users/create"
            className="mt-3 md:mt-0 inline-flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition"
          >
            ➕ Create User
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <UserSearch value={term} onChange={setTerm} placeholder="🔍 Search users..." />
        </div>

        {/* Loading / Error / Empty */}
        {isLoading && (
          <div className="text-center text-gray-600 py-6">Loading users...</div>
        )}
        {error && (
          <div className="text-center text-red-600 py-6">
            Failed to load users. Please try again.
          </div>
        )}
        {!isLoading && users?.length === 0 && (
          <div className="text-center text-gray-500 py-6">No users found</div>
        )}

        {/* User List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users?.map((u) => (
            <div
              key={u.id}
              className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {u.firstName} {u.lastName}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{u.email}</p>

              <div className="flex gap-3">
                <Link
                  to={`/users/${u.id}`}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                >
                  View
                </Link>
                <button
                  onClick={() => onDelete(u.id)}
                  className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
