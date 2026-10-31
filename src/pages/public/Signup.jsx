import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/FormField';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = signup({
      name: data.get('name'), email: data.get('email'),
      password: data.get('password'), role: data.get('role')
    });
    if (!result.ok) { setErrors(result.errors); return; }
    navigate('/login');
  }

  function clearError(event) {
    const key = event.target.name;
    setErrors((current) => ({ ...current, [key]: '' }));
  }

  return <section className="auth-card card">
    <span className="badge badge-open">Join SkillBridge</span>
    <h1>Create your account</h1>
    <p className="auth-intro">Choose how you want to take part in the marketplace.</p>
    <form className="auth-form" onSubmit={submit} noValidate>
      <FormField id="signup-name" label="Full name" name="name" autoComplete="name" error={errors.name} onChange={clearError} />
      <FormField id="signup-email" label="Email address" name="email" type="email" autoComplete="email" error={errors.email} onChange={clearError} />
      <FormField id="signup-password" label="Password" name="password" type="password" autoComplete="new-password" error={errors.password} onChange={clearError} />
      <FormField as="select" id="signup-role" label="Account type" name="role" defaultValue="" error={errors.role} onChange={clearError}>
        <option value="" disabled>Select a role</option>
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </FormField>

      <button className="btn btn-primary auth-submit" type="submit">Create account</button>
    </form>
    <p className="auth-switch">Already registered? <Link to="/login">Log in</Link></p>
  </section>;
}
