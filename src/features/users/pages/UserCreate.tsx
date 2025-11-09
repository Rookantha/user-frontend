import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { useCreateUser } from '../hooks/useUsers';

export const UserCreate: React.FC = () => {
    const nav = useNavigate();
    const create = useCreateUser();

    const onSubmit = async (values: any) => {
        try {
            await create.mutateAsync(values);
            nav('/');
        } catch (err) {
            alert((err as any)?.response?.data?.message || 'Failed to create user');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Create User</h2>
            <UserForm onSubmit={onSubmit} submitLabel="Create" />
        </div>
    );
};
