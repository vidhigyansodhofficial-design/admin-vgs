import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/Users';
import CoursesPage from './pages/Courses';
import SecurityPage from './pages/Security';
import ReviewsPage from './pages/Reviews';
import SettingsPage from './pages/Settings';
import AnalyticsPage from './pages/Analytics';
import CourseDetailsPage from './pages/CourseDetails';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route 
          path="/admin/*" 
          element={
            <AdminLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/:id" element={<CourseDetailsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="security" element={<SecurityPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Routes>
            </AdminLayout>
          } 
        />
      </Routes>
    </Router>
  );
}
