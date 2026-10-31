import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute, { dashboardFor } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import NotFound from './pages/public/NotFound';
import ClientDashboard from './pages/client/ClientDashboard';
import PostProject from './pages/client/PostProject';
import MyProjects from './pages/client/MyProjects';
import BrowseFreelancers from './pages/client/BrowseFreelancers';
import FreelancerProfile from './pages/client/FreelancerProfile';
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import BrowseProjects from './pages/freelancer/BrowseProjects';
import MyProposals from './pages/freelancer/MyProposals';
import MyProfile from './pages/freelancer/MyProfile';
import ProjectDetails from './pages/shared/ProjectDetails';
import AdminDashboard from './pages/admin/AdminDashboard';

function GuestOnly({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to={dashboardFor(user.role)} replace /> : children;
}

function Guarded({ roles, children }) {
  return <ProtectedRoute allowedRoles={roles}>{children}</ProtectedRoute>;
}

export default function App() {
  return <BrowserRouter><Layout><Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
    <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />

    <Route path="/client" element={<Guarded roles={['client']}><ClientDashboard /></Guarded>} />
    <Route path="/client/post-project" element={<Guarded roles={['client']}><PostProject /></Guarded>} />
    <Route path="/client/projects" element={<Guarded roles={['client']}><MyProjects /></Guarded>} />
    <Route path="/client/freelancers" element={<Guarded roles={['client']}><BrowseFreelancers /></Guarded>} />
    <Route path="/client/freelancers/:id" element={<Guarded roles={['client']}><FreelancerProfile /></Guarded>} />

    <Route path="/freelancer" element={<Guarded roles={['freelancer']}><FreelancerDashboard /></Guarded>} />
    <Route path="/freelancer/projects" element={<Guarded roles={['freelancer']}><BrowseProjects /></Guarded>} />
    <Route path="/freelancer/proposals" element={<Guarded roles={['freelancer']}><MyProposals /></Guarded>} />
    <Route path="/freelancer/profile" element={<Guarded roles={['freelancer']}><MyProfile /></Guarded>} />

    <Route path="/projects/:id" element={<Guarded roles={['client', 'freelancer']}><ProjectDetails /></Guarded>} />
    <Route path="/admin" element={<Guarded roles={['admin']}><AdminDashboard /></Guarded>} />
    <Route path="*" element={<NotFound />} />
  </Routes></Layout></BrowserRouter>;
}
