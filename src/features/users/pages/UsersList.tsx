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
        if (!confirm('Delete user?')) return;
        deleteMutation.mutate(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Users</h2>
                <Link to="/users/create" className="px-3 py-2 bg-green-600 text-white rounded">
                    Create
                </Link>
            </div>

            {/* ✅ Add the search input here */}
            <UserSearch value={term} onChange={setTerm} />

            {users?.length === 0 && <div>No users found</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users?.map((u) => (
                    <UserCard key={u.id} user={u} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};
