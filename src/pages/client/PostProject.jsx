import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { createProject } from '../../services/projectService';

const initialForm = { title: '', description: '', skillsNeeded: '', budget: '', deadline: '' };

export default function PostProject() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Please provide a project title.';
    if (!form.description.trim()) nextErrors.description = 'Please provide a project description.';
    if (!form.budget || !Number.isFinite(Number(form.budget)) || Number(form.budget) <= 0) {
      nextErrors.budget = 'Please enter a valid positive budget.';
    }
    if (!form.deadline) nextErrors.deadline = 'Please choose a target deadline.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    createProject({
      clientId: user.id,
      title: form.title,
      description: form.description,
      skillsNeeded: form.skillsNeeded,
      budget: Number(form.budget),
      deadline: form.deadline,
      status: 'OPEN',
      acceptedProposalId: null
    });
    showToast('Project posted successfully.', 'success');
    navigate('/client/projects');
  }

  return <section className="form-page">
    <header className="page-heading">
      <Link className="back-link" to="/client">← Client dashboard</Link>
      <span className="badge badge-open">New listing</span>
      <h1>Post a project</h1>
      <p>Describe the work and the skills you need.</p>
    </header>
    <form className="card project-form" onSubmit={submit} noValidate>
      <FormField label="Project title" name="title" value={form.title} error={errors.title} onChange={updateField} placeholder="e.g. Build a store for my local bakery" />
      <FormField as="textarea" label="Project description" name="description" value={form.description} error={errors.description} onChange={updateField} rows="6" placeholder="Describe the work, goals, and what you need delivered." />
      <FormField label="Skills needed" name="skillsNeeded" value={form.skillsNeeded} onChange={updateField} placeholder="e.g. React, UI Design, Copywriting" />
      <p className="field-hint">Separate skills with commas.</p>
      <div className="form-row">
        <FormField label="Budget (₹)" name="budget" type="number" min="1" step="1" value={form.budget} error={errors.budget} onChange={updateField} placeholder="25000" />
        <FormField label="Target deadline" name="deadline" type="date" value={form.deadline} error={errors.deadline} onChange={updateField} />
      </div>
      <div className="form-actions">
        <Link className="btn btn-outline" to="/client/projects">Cancel</Link>
        <button className="btn btn-primary" type="submit">Publish project</button>
      </div>
    </form>
  </section>;
}
