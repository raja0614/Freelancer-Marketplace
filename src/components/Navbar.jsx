import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function dashboardFor(role) {
  if (role === 'admin') return '/admin';
  return `/${role}`;
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return <header className="navbar">
    <Link className="nav-brand" to="/">SkillBridge</Link>
    <nav className="nav-actions">
      {user ? <>
        <span className="nav-greeting">Hi, {user.name}</span>
        <Link className="nav-link" to={dashboardFor(user.role)}>Dashboard</Link>
        <button className="btn btn-outline nav-logout" type="button" onClick={handleLogout}>Logout</button>
      </> : <>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="btn btn-primary" to="/signup">Sign Up</Link>
      </>}
    </nav>
  </header>;
}
