import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/helpers';
import FormField from '../../components/FormField';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');
    const nextErrors = {};
    if (!email) nextErrors.email = 'Email address is required.';
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Password is required.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const result = login(email, password);
    if (!result.ok) { setErrors({ general: result.error }); return; }
    navigate(result.user.role === 'admin' ? '/admin' : `/${result.user.role}`);
  }

  function clearError(event) {
    const key = event.target.name;
    setErrors((current) => ({ ...current, [key]: '', general: '' }));
  }

  return <section className="auth-card card">
    <span className="badge badge-open">Welcome back</span>
    <h1>Log in to SkillBridge</h1>
    <p className="auth-intro">Continue connecting with clients and independent talent.</p>
    <form className="auth-form" onSubmit={submit} noValidate>
      <FormField id="login-email" label="Email address" name="email" type="email" autoComplete="email" error={errors.email} onChange={clearError} />
      <FormField id="login-password" label="Password" name="password" type="password" autoComplete="current-password" error={errors.password} onChange={clearError} />
      {errors.general && <p className="form-error" role="alert">{errors.general}</p>}
      <button className="btn btn-primary auth-submit" type="submit">Log in</button>
    </form>
    <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
    <p className="demo-account">Demo admin: admin@skillbridge.com / admin123</p>
  </section>;
}
