import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser, useUpdateUser } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm';


export const UserDetail: React.FC = () => {
    const { id } = useParams();
    const userId = id ? Number(id) : undefined;
    const { data: user, isLoading } = useUser(userId);
    const update = useUpdateUser();
    const nav = useNavigate();


    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;


    const onSubmit = async (values: any) => {
        try {
            await update.mutateAsync({ id: user.id, payload: values });
            nav('/');
        } catch (err) {
            alert((err as any)?.response?.data?.message || 'Update failed');
        }
    };


    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <UserForm initialValues={user as any} onSubmit={onSubmit} submitLabel="Update" />
        </div>
    );
};