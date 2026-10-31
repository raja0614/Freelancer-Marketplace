import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { getProjectById } from '../../services/projectService';
import { getProposalsForFreelancer, markProjectCompleted } from '../../services/proposalService';

export default function MyProposals() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [proposals, setProposals] = useState([]);
  const [projectsById, setProjectsById] = useState({});

  useEffect(() => {
    const ownProposals = getProposalsForFreelancer(user.id);
    setProposals(ownProposals);
    setProjectsById(Object.fromEntries(ownProposals.map((proposal) => [proposal.projectId, getProjectById(proposal.projectId)])));
  }, [user.id]);

  function completeProject(projectId) {
    if (!markProjectCompleted(projectId, user.id)) {
      showToast('This project could not be marked completed.', 'error');
      return;
    }
    setProjectsById((current) => ({
      ...current,
      [projectId]: { ...current[projectId], status: 'COMPLETED' }
    }));
    showToast('Project marked as completed.', 'success');
  }

  return <section>
    <header className="page-heading">
      <span className="badge badge-completed">Freelancer workspace</span>
      <h1>My proposals</h1>
      <p>Review your bids and the status of each client project.</p>
    </header>
    {proposals.length ? <div className="proposal-list">{proposals.map((proposal) => {
      const project = projectsById[proposal.projectId];
      const acceptedAndInProgress = String(proposal.status).toUpperCase() === 'ACCEPTED' && project?.status === 'IN_PROGRESS';
      return <article className="card proposal-card" key={proposal.id}>
        <div className="proposal-heading">
          <div><h2><Link to={`/projects/${proposal.projectId}`}>{project?.title || `Project #${proposal.projectId}`}</Link></h2><p>Submitted {formatDate(proposal.createdAt) || 'recently'} · Project status: {project?.status || 'UNKNOWN'}</p></div>
          <Badge status={proposal.status} />
        </div>
        <div className="proposal-bid"><span>Your bid</span><strong>{formatCurrency(proposal.bidAmount)}</strong></div>
        {proposal.message && <p className="proposal-message">{proposal.message}</p>}
        <div className="proposal-actions">
          <Link className="btn btn-outline" to={`/projects/${proposal.projectId}`}>View project</Link>
          {acceptedAndInProgress && <button className="btn btn-primary" type="button" onClick={() => completeProject(proposal.projectId)}>Mark as Completed</button>}
          {String(proposal.status).toUpperCase() === 'ACCEPTED' && project?.status === 'COMPLETED' && <Badge status="COMPLETED" label="Project completed" />}
        </div>
      </article>;
    })}</div> : <EmptyState message="You have not submitted any proposals yet. Browse open projects to find your next opportunity." />}
  </section>;
}
