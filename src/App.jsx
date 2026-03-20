import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import TriggerPage from "./pages/TriggerPage";
import FraudGuardPage from "./pages/FraudGuardPage";
import PayoutPage from "./pages/PayoutPage";
import PayoutReceivedPage from "./pages/PayoutReceivedPage";
import PayoutHistoryPage from "./pages/PayoutHistoryPage";
import AdminOperationsPage from "./pages/AdminOperationsPage";
import NotificationStack from "./components/NotificationStack";
import { hasRole, isSessionActive } from "./utils/session";

function ProtectedRoute({ children }) {
  if (!isSessionActive()) {
    return <Navigate replace to="/auth" />;
  }
  return children;
}

function AdminRoute({ children }) {
  if (!isSessionActive()) {
    return <Navigate replace to="/auth" />;
  }

  if (!hasRole("admin")) {
    return <Navigate replace to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <NotificationStack />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/triggers" element={<TriggerPage />} />
        <Route path="/fraud-guard" element={<FraudGuardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/payout"
          element={(
            <ProtectedRoute>
              <PayoutPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/payout/received"
          element={(
            <ProtectedRoute>
              <PayoutReceivedPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/payout/history"
          element={(
            <ProtectedRoute>
              <PayoutHistoryPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/ops"
          element={(
            <AdminRoute>
              <AdminOperationsPage />
            </AdminRoute>
          )}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
