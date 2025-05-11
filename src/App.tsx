import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import SegmentBuilderPage from './pages/segments/SegmentBuilderPage';
import CampaignPage from './pages/campaigns/CampaignPage';
import CampaignHistoryPage from './pages/campaigns/CampaignHistoryPage';
import CustomersPage from './pages/customers/CustomersPage';
import NotFoundPage from './pages/NotFoundPage';

// Hooks
import { useAuthStore } from './stores/authStore';

// Guards
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const location = useLocation();
  const { isAuthenticated, checkAuth } = useAuthStore();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />
          } />
        </Route>

        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          
          <Route path="/segments/new" element={
            <PrivateRoute>
              <SegmentBuilderPage />
            </PrivateRoute>
          } />
          
          <Route path="/segments/edit/:id" element={
            <PrivateRoute>
              <SegmentBuilderPage />
            </PrivateRoute>
          } />
          
          <Route path="/campaigns/new" element={
            <PrivateRoute>
              <CampaignPage />
            </PrivateRoute>
          } />
          
          <Route path="/campaigns/history" element={
            <PrivateRoute>
              <CampaignHistoryPage />
            </PrivateRoute>
          } />
          
          <Route path="/customers" element={
            <PrivateRoute>
              <CustomersPage />
            </PrivateRoute>
          } />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;