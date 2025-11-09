import React from 'react';
import type { User } from '../types/User';
import { Link } from 'react-router-dom';


export const UserCard: React.FC<{ user: User; onDelete?: (id: number) => void }> = ({ user, onDelete }) => {
    return (
        <div className="border p-4 rounded">
            <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
            <p className="text-sm">{user.email}</p>
            <div className="mt-2 flex gap-2">
                <Link to={`/users/${user.id}`} className="text-blue-600 underline">View</Link>
                <button onClick={() => onDelete?.(user.id)} className="text-red-600">Delete</button>
            </div>
        </div>
    );
};