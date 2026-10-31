import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-inner">
      <div>
        <Link className="footer-brand" to="/">Skill<span>Bridge</span></Link>
        <p className="footer-text">© {new Date().getFullYear()} SkillBridge</p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link className="footer-link" to="/">Home</Link>
        <Link className="footer-link" to="/login">Login</Link>
        <Link className="footer-link" to="/signup">Sign Up</Link>
      </nav>
    </div>
  </footer>;
}
