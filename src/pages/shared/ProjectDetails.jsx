import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import FormField from '../../components/FormField';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getProjectById } from '../../services/projectService';
import { acceptProposal, getProposalsForProject, hasProposed, rejectProposal, submitProposal } from '../../services/proposalService';
import { getUserById } from '../../services/userService';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [project, setProject] = useState(() => getProjectById(id));
  const [proposals, setProposals] = useState(() => getProposalsForProject(id));
  const [message, setMessage] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [errors, setErrors] = useState({});

  function reloadProjectData() {
    setProject(getProjectById(id));
    setProposals(getProposalsForProject(id));
  }

  useEffect(() => {
    reloadProjectData();
  }, [id]);

  const myProposal = useMemo(
    () => proposals.find((proposal) => String(proposal.freelancerId) === String(user.id)) || null,
    [proposals, user.id]
  );
  const ownsProject = project && String(project.clientId) === String(user.id);
  const isClient = user.role === 'client';

  if (!project) return <section className="project-not-found card">
    <Badge status="REJECTED" label="Not found" />
    <h1>Project not found</h1>
    <p>This project may have been removed or the link may be incorrect.</p>
    <Link className="btn btn-primary" to={isClient ? '/client/projects' : '/freelancer/projects'}>Back to projects</Link>
  </section>;

  if (isClient && !ownsProject) return <Navigate to="/client/projects" replace />;

  function handleAccept(proposalId) {
    if (!acceptProposal(proposalId)) {
      showToast('Could not accept this proposal.', 'error');
      return;
    }
    reloadProjectData();
    showToast('Proposal accepted.', 'success');
  }

  function handleReject(proposalId) {
    if (!rejectProposal(proposalId)) {
      showToast('Could not reject this proposal.', 'error');
      return;
    }
    reloadProjectData();
    showToast('Proposal rejected.', 'success');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    const cleanMessage = message.trim();
    const amount = Number(bidAmount);
    if (!cleanMessage) nextErrors.message = 'Please enter a proposal message.';
    if (!bidAmount || !Number.isFinite(amount) || amount <= 0) nextErrors.bidAmount = 'Enter a valid positive bid.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const result = submitProposal(project.id, user.id, cleanMessage, amount);
    if (!result.success) { setErrors({ general: result.error }); return; }
    showToast('Proposal submitted successfully.', 'success');
    navigate('/freelancer/proposals');
  }

  const canSubmitProposal = user.role === 'freelancer' && project.status === 'OPEN' && !hasProposed(project.id, user.id);
  const existingProposal = myProposal;

  return <section className="project-details-page">
    <Link className="back-link" to={isClient ? '/client/projects' : '/freelancer/projects'}>← Back to {isClient ? 'my projects' : 'browse projects'}</Link>

    <article className="card project-details-card">
      <div className="project-details-heading"><h1>{project.title}</h1><Badge status={project.status} /></div>
      <div className="detail-grid">
        <div><p className="detail-item-label">Budget</p><p className="detail-item-value">{formatCurrency(project.budget)}</p></div>
        <div><p className="detail-item-label">Deadline</p><p className="detail-item-value">{formatDate(project.deadline) || 'Not specified'}</p></div>
        <div><p className="detail-item-label">Posted</p><p className="detail-item-value">{formatDate(project.createdAt) || 'Recently'}</p></div>
      </div>
      <section className="detail-section"><h2>Description</h2><p className="project-description">{project.description || 'No description provided.'}</p></section>
      <section className="detail-section"><h2>Required skills</h2>
        {project.skillsNeeded?.length ? <div className="skill-list">{project.skillsNeeded.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div> : <EmptyState message="No specific skills listed." />}
      </section>
    </article>

    {ownsProject && <section className="project-proposals-section">
      <div className="section-heading-row"><div><h2>Proposals ({proposals.length})</h2><p>Review bids from freelancers for this project.</p></div></div>
      {proposals.length ? <div className="proposal-list">{proposals.map((proposal) => {
        const freelancer = getUserById(proposal.freelancerId);
        const isPendingOnOpenProject = String(proposal.status).toUpperCase() === 'PENDING' && project.status === 'OPEN';
        return <article className="card proposal-card" key={proposal.id}>
          <div className="proposal-heading">
            <div><h3>{freelancer ? <Link to={`/client/freelancers/${freelancer.id}`}>{freelancer.name}</Link> : 'Unknown freelancer'}</h3><p>Bid amount: <strong>{formatCurrency(proposal.bidAmount)}</strong></p></div>
            <Badge status={proposal.status || 'PENDING'} />
          </div>
          <p className="proposal-message">{proposal.message || 'No message provided.'}</p>
          {isPendingOnOpenProject && <div className="proposal-actions">
            <button className="btn btn-outline" type="button" onClick={() => handleReject(proposal.id)}>Reject</button>
            <button className="btn btn-primary" type="button" onClick={() => handleAccept(proposal.id)}>Accept</button>
          </div>}
        </article>;
      })}</div> : <EmptyState message="No proposals have been submitted for this project yet." />}
    </section>}

    {user.role === 'freelancer' && <section className="project-proposals-section freelancer-project-action">
      {existingProposal ? <article className="card existing-proposal">
        <div className="proposal-heading"><div><h2>Your proposal</h2><p>Your bid: <strong>{formatCurrency(existingProposal.bidAmount)}</strong></p></div><Badge status={existingProposal.status} /></div>
        <p className="proposal-message">{existingProposal.message}</p>
        <Link className="btn btn-outline" to="/freelancer/proposals">View my proposals</Link>
      </article> : canSubmitProposal ? <article className="card proposal-form-card">
        <h2>Submit a proposal</h2>
        <p>Introduce yourself and share your bid for this project.</p>
        <form className="proposal-form" onSubmit={handleSubmit} noValidate>
          <FormField as="textarea" label="Proposal message" name="message" rows="5" value={message} error={errors.message} onChange={(event) => { setMessage(event.target.value); setErrors((current) => ({ ...current, message: '', general: '' })); }} placeholder="Explain how you would approach this work." />
          <FormField label="Your bid (₹)" name="bidAmount" type="number" min="1" step="1" value={bidAmount} error={errors.bidAmount} onChange={(event) => { setBidAmount(event.target.value); setErrors((current) => ({ ...current, bidAmount: '', general: '' })); }} placeholder="15000" />
          {errors.general && <p className="form-error" role="alert">{errors.general}</p>}
          <button className="btn btn-primary" type="submit">Submit proposal</button>
        </form>
      </article> : <EmptyState message="This project is no longer accepting proposals." />}
    </section>}
  </section>;
}
