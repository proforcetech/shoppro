// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './router/ProtectedRoute';

import { DefaultLayout } from './layouts/DefaultLayout';
import LoginPage from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import CustomersPage from './pages/CustomersPage';
import { EstimatesPage } from './pages/EstimatesPage';
import { InvoicesPage } from './pages/InvoicesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import SettingsPage from './pages/SettingsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SupportPage } from './pages/SupportPage';
import { WarrantyClaimsPage } from './pages/WarrantyClaimsPage';
import { NotFound } from './pages/NotFound';
import { Unauthorized } from './pages/Unauthorized';
import { LandingPage } from './pages/LandingPage'; // Import the new landing page

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route element={<DefaultLayout />}>
              <Route path="/dashboard" element={
                <ProtectedRoute role="MANAGER">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/customers" element={
                <ProtectedRoute role="FRONT_DESK">
                  <CustomersPage />
                </ProtectedRoute>
              } />
              <Route path="/estimates" element={
                <ProtectedRoute role="FRONT_DESK">
                  <EstimatesPage />
                </ProtectedRoute>
              } />
              <Route path="/invoices" element={
                <ProtectedRoute role="FRONT_DESK">
                  <InvoicesPage />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute role="MANAGER">
                  <AnalyticsPage />
                </ProtectedRoute>
              } />
              <Route path="/appointments" element={
                <ProtectedRoute role="FRONT_DESK">
                  <AppointmentsPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute role="ADMIN">
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute role="ACCOUNTANT">
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/support" element={
                <ProtectedRoute>
                  <SupportPage />
                </ProtectedRoute>
              } />
              <Route path="/warranty" element={
                <ProtectedRoute role="CUSTOMER">
                  <WarrantyClaimsPage />
                </ProtectedRoute>
              } />
            </Route>

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}