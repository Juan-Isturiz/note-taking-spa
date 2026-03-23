import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { NotesPage } from './pages/NotesPage';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<NotesPage isArchived={false} />} />
          <Route path="/archived" element={<NotesPage isArchived={true} />} />
        </Route>
      </Route>

      {/* Catch-all para URLs que no existen */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
