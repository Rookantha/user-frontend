import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersList } from '../features/users/pages/UsersList';
import { UserDetail } from '../features/users/pages/UserDetail';
import { UserCreate } from '../features/users/pages/UserCreate';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4">User Management</h1>

          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/users/:id" element={<UserDetail />} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
