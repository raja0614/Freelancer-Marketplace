import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import { getProjectsByClient } from '../../services/projectService';
import { getProposalsForProject } from '../../services/proposalService';

const shortcuts = [
  { title: 'Post a Project', description: 'Share the work, budget, and skills you need.', to: '/client/post-project', action: 'Create a listing' },
  { title: 'My Projects', description: 'Review your project listings and incoming proposals.', to: '/client/projects', action: 'View projects' },
  { title: 'Browse Freelancers', description: 'Explore independent talent by profile and skills.', to: '/client/freelancers', action: 'Find talent' }
];

export default function ClientDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getProjectsByClient(user.id));
  }, [user.id]);

  const proposalCount = useMemo(() => projects.reduce(
    (total, project) => total + getProposalsForProject(project.id).length, 0
  ), [projects]);

  return <section>
    <header className="client-welcome">
      <span className="badge badge-open">Client workspace</span>
      <h1>Welcome back, {user.name}!</h1>
      <p>Manage your project listings and find freelancers for your next idea.</p>
    </header>

    <div className="stats-grid client-stats">
      <StatCard label="My projects" value={projects.length} />
      <StatCard label="Proposals received" value={proposalCount} />
    </div>

    <section className="client-shortcuts" aria-labelledby="shortcuts-heading">
      <div className="section-heading-row"><div><h2 id="shortcuts-heading">Quick actions</h2><p>Pick up where you need to go.</p></div></div>
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
