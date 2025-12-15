import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { Dashboard } from "../pages/dashboard/Dashbaord";
import { AddNewPerson } from "../pages/dashboard/Persons/pages/AddNewPerson";
import EditPerson from "../pages/dashboard/Persons/pages/EditPerson";
import ViewPerson from "../pages/dashboard/Persons/pages/ViewPerson";
import AddHealthInsurance from "../pages/healthInsurance/pages/AddHealthInsurance";
import EditHealthInsurance from "../pages/healthInsurance/pages/EditHealthInsurance";
import IndexHealthInsurance from "../pages/healthInsurance/pages/IndexHealthInsurance";
import ViewHealthInsurance from "../pages/healthInsurance/pages/ViewHealthInsurance";
import { ProtectedRoute } from "./ProtectedRoute";
import IndexHealthInsuranceSecondry from "../pages/HealthInsuranceSecondry/IndexHealthInsuranceSecondery";
import ViewHealthInsuranceSecondery from "../pages/HealthInsuranceSecondry/ViewHealthInsuranceSecondery";
import EditHealthInsuranceSecondery from "../pages/HealthInsuranceSecondry/EditHealthInsuranceSecondery";
import AddHealthInsuranceSecondry from "../pages/HealthInsuranceSecondry/AddHealthInsuranceSecondery";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* مسار تسجيل الدخول */}
      <Route
        path="/"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      {/* مسار تسجيل الدخول */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      {/* المسارات المحمية */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/health-insurance"
        element={
          <ProtectedRoute>
            <IndexHealthInsurance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-new-health-insurance"
        element={
          <ProtectedRoute>
            <AddHealthInsurance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-health-insurance/:idNumber"
        element={
          <ProtectedRoute>
            <EditHealthInsurance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-health-insurance/:idNumber"
        element={
          <ProtectedRoute>
            <ViewHealthInsurance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/health-insurance-secondry"
        element={
          <ProtectedRoute>
            <IndexHealthInsuranceSecondry />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-health-insurance-secondery/:idNumber"
        element={
          <ProtectedRoute>
            <ViewHealthInsuranceSecondery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-health-insurance-secondery/:idNumber"
        element={
          <ProtectedRoute>
            <EditHealthInsuranceSecondery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-health-insurance-secondery"
        element={
          <ProtectedRoute>
            <AddHealthInsuranceSecondry />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-new-person"
        element={
          <ProtectedRoute>
            <AddNewPerson />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view-person/:idNumber"
        element={
          <ProtectedRoute>
            <ViewPerson />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-person/:idNumber"
        element={
          <ProtectedRoute>
            <EditPerson />
          </ProtectedRoute>
        }
      />

      {/* التوجيه الافتراضي */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* صفحة 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600">الصفحة غير موجودة</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
};
