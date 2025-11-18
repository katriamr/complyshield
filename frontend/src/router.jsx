import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import CompanySetupPage from "./pages/company/CompanySetupPage.jsx";
import TaskListPage from "./pages/compliance/TaskListPage.jsx";
import InvoiceUploadPage from "./pages/invoices/InvoiceUploadPage.jsx";
import NotificationPage from "./pages/notifications/NotificationPage.jsx";

const AppRouter = () => {
  return (
    <Routes>

      {/* Auth with nested outlet */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Protected Dashboard */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="company" element={<CompanySetupPage />} />
        <Route path="tasks" element={<TaskListPage />} />
        <Route path="invoices" element={<InvoiceUploadPage />} />
        <Route path="notifications" element={<NotificationPage />} />
      </Route>

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/auth/login" />} />

    </Routes>
  );
};

export default AppRouter;
