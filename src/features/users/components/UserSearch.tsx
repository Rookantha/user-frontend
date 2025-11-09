import React from 'react';

export const UserSearch: React.FC<{
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}> = ({ value, onChange, placeholder = 'Search users...' }) => {
    return (
        <div className="mb-4">
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="border p-2 w-full rounded"
            />
        </div>
    );
};
