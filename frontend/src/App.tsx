import { Routes, Route, Navigate } from 'react-router-dom';

// Onboarding
import SplashPage from './pages/onboarding/SplashPage';
import ScanIntroPage from './pages/onboarding/ScanIntroPage';
import KnowIntroPage from './pages/onboarding/KnowIntroPage';
import ConnectIntroPage from './pages/onboarding/ConnectIntroPage';

// Auth
import LoginPage from './pages/auth/LoginPage';
import VerifyOtpPage from './pages/auth/VerifyOtpPage';
import RoleSelectionPage from './pages/auth/RoleSelectionPage';

// Shared
import SetupCompletePage from './pages/shared/SetupCompletePage';
import ScanImagePage from './pages/shared/ScanImagePage';
import PoliciesPage from './pages/shared/PoliciesPage';

// Farmer
import FarmerInfoPage from './pages/farmer/FarmerInfoPage';
import FarmerDashboardPage from './pages/farmer/FarmerDashboardPage';
import FarmerProfilePage from './pages/farmer/FarmerProfilePage';
import FarmerReportPage from './pages/farmer/FarmerReportPage';
import FarmerHistoryPage from './pages/farmer/FarmerHistoryPage';

// Procurement
import ProcurementLoginPage from './pages/procurement/ProcurementLoginPage';
import ProcurementDashboardPage from './pages/procurement/ProcurementDashboardPage';
import LotAnalysisPage from './pages/procurement/LotAnalysisPage';

// To add a new page later:
// 1. Create the component under src/pages/<domain>/YourPage.tsx
// 2. Import it above
// 3. Add a <Route path="..." element={<YourPage />} /> below
export default function App() {
  return (
    <Routes>
      {/* Onboarding flow: page 1 -> 4 */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding/scan" element={<ScanIntroPage />} />
      <Route path="/onboarding/know" element={<KnowIntroPage />} />
      <Route path="/onboarding/connect" element={<ConnectIntroPage />} />

      {/* Auth flow: page 5 -> 7 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/get-started" element={<RoleSelectionPage />} />

      {/* Shared pages used by both roles */}
      <Route path="/setup-complete" element={<SetupCompletePage />} />
      <Route path="/scan" element={<ScanImagePage />} />
      <Route path="/policies" element={<PoliciesPage />} />

      {/* Farmer flow */}
      <Route path="/farmer/details" element={<FarmerInfoPage />} />
      <Route path="/farmer/dashboard" element={<FarmerDashboardPage />} />
      <Route path="/farmer/profile" element={<FarmerProfilePage />} />
      <Route path="/farmer/reports" element={<FarmerReportPage />} />
      <Route path="/farmer/history" element={<FarmerHistoryPage />} />

      {/* Procurement Centre flow */}
      <Route path="/procurement/login" element={<ProcurementLoginPage />} />
      <Route path="/procurement/dashboard" element={<ProcurementDashboardPage />} />
      <Route path="/procurement/lots-analysis" element={<LotAnalysisPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
