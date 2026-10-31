import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import { getProposalsForFreelancer } from '../../services/proposalService';

const shortcuts = [
  { title: 'Browse Projects', description: 'Find open client projects that fit your skills.', to: '/freelancer/projects', action: 'Explore projects' },
  { title: 'My Proposals', description: 'Check proposal status and accepted work.', to: '/freelancer/proposals', action: 'View proposals' },
  { title: 'My Profile', description: 'Keep your bio, skills, and portfolio up to date.', to: '/freelancer/profile', action: 'Edit profile' }
];

export default function FreelancerDashboard() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    setProposals(getProposalsForFreelancer(user.id));
  }, [user.id]);

  const acceptedCount = useMemo(
    () => proposals.filter((proposal) => String(proposal.status).toUpperCase() === 'ACCEPTED').length,
    [proposals]
  );

  return <section>
    <header className="client-welcome">
      <span className="badge badge-completed">Freelancer workspace</span>
      <h1>Welcome back, {user.name}!</h1>
      <p>Browse project opportunities and keep track of the proposals you have sent.</p>
    </header>

    <div className="stats-grid client-stats">
      <StatCard label="Proposals submitted" value={proposals.length} />
      <StatCard label="Accepted proposals" value={acceptedCount} />
    </div>

    <section className="client-shortcuts" aria-labelledby="freelancer-shortcuts-heading">
      <div className="section-heading-row"><div><h2 id="freelancer-shortcuts-heading">Quick actions</h2><p>Manage your work and profile.</p></div></div>
      <div className="shortcut-grid">
        {shortcuts.map((shortcut) => <Link className="card shortcut-card" to={shortcut.to} key={shortcut.to}>
          <h3>{shortcut.title}</h3>
          <p>{shortcut.description}</p>
          <span>{shortcut.action} <span aria-hidden="true">→</span></span>
        </Link>)}
      </div>
    </section>
  </section>;
}
