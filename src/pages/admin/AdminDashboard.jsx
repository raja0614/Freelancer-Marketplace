import { useMemo, useState } from 'react';
import Badge from '../../components/Badge';
import StatCard from '../../components/StatCard';
import { useToast } from '../../context/ToastContext';
import { getAll } from '../../services/storage';
import { getStats, removeProject, removeUser } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/helpers';

const tabs = ['Overview', 'Users', 'Projects', 'Proposals'];

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('Overview');
  const [revision, setRevision] = useState(0);

  // Reload related tables and computed stats together after an admin action.
  const data = useMemo(() => {
    const users = getAll('users');
    const projects = getAll('projects');
    const proposals = getAll('proposals');
    return {
      users,
      projects,
      proposals,
      stats: getStats(),
      userById: new Map(users.map((user) => [String(user.id), user])),
      projectById: new Map(projects.map((project) => [String(project.id), project]))
    };
  }, [revision]);

  const statCards = [
    ['Total users', data.stats.totalUsers],
    ['Clients', data.stats.totalClients],
    ['Freelancers', data.stats.totalFreelancers],
    ['Projects', data.stats.totalProjects],
    ['Proposals', data.stats.totalProposals],
    ['Open projects', data.stats.projectsByStatus.OPEN],
    ['In progress', data.stats.projectsByStatus.IN_PROGRESS],
    ['Completed projects', data.stats.projectsByStatus.COMPLETED]
  ];

  function refresh(message) {
    setRevision((value) => value + 1);
    showToast(message, 'success');
  }

  function handleRemoveUser(user) {
    if (!window.confirm(`Remove ${user.name} (${user.email})?`)) return;
    if (removeUser(user.id)) refresh('User removed.');
  }

  function handleRemoveProject(project) {
    if (!window.confirm(`Remove “${project.title}” and its proposals?`)) return;
    if (removeProject(project.id)) refresh('Project and its proposals removed.');
  }

  return <section className="admin-page">
    <header className="admin-heading">
      <Badge status="OPEN" label="Administrator Area" />
      <h1>Admin Dashboard</h1>
      <p>Review marketplace activity and manage accounts, projects, and proposals.</p>
    </header>

    <nav className="admin-tabs" aria-label="Admin dashboard sections">
      {tabs.map((tab) => <button
        key={tab}
        type="button"
        className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
        aria-current={activeTab === tab ? 'page' : undefined}
        onClick={() => setActiveTab(tab)}
      >{tab}</button>)}
    </nav>

    {(activeTab === 'Overview') && <section aria-label="Marketplace statistics">
      <div className="stats-grid admin-stats-grid">
        {statCards.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
      </div>
    </section>}

    {(activeTab === 'Overview' || activeTab === 'Users') && <section className="admin-section">
      <h2>Users</h2>
      <div className="table-wrap"><table className="admin-table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
        <tbody>{data.users.length ? data.users.map((user) => <tr key={user.id}>
          <td>{user.name || '—'}</td><td>{user.email || '—'}</td><td><Badge status={user.role === 'admin' ? 'ACCEPTED' : 'OPEN'} label={user.role || 'unknown'} /></td>
          <td>{formatDate(user.createdAt) || '—'}</td>
          <td>{user.role === 'admin' ? 'Admin account' : <button className="btn btn-outline btn-small" type="button" onClick={() => handleRemoveUser(user)}>Remove</button>}</td>
        </tr>) : <tr><td colSpan="5" className="admin-empty">No users found.</td></tr>}</tbody>
      </table></div>
    </section>}

    {(activeTab === 'Overview' || activeTab === 'Projects') && <section className="admin-section">
      <h2>Projects</h2>
      <div className="table-wrap"><table className="admin-table">
        <thead><tr><th>Title</th><th>Client</th><th>Status</th><th>Budget</th><th>Action</th></tr></thead>
        <tbody>{data.projects.length ? data.projects.map((project) => <tr key={project.id}>
          <td>{project.title || 'Untitled project'}</td><td>{data.userById.get(String(project.clientId))?.name || 'Unknown client'}</td>
          <td><Badge status={project.status} /></td><td>{formatCurrency(project.budget)}</td>
          <td><button className="btn btn-outline btn-small" type="button" onClick={() => handleRemoveProject(project)}>Remove</button></td>
        </tr>) : <tr><td colSpan="5" className="admin-empty">No projects found.</td></tr>}</tbody>
      </table></div>
    </section>}

    {(activeTab === 'Overview' || activeTab === 'Proposals') && <section className="admin-section">
      <h2>Proposals</h2>
      <div className="table-wrap"><table className="admin-table">
        <thead><tr><th>Project</th><th>Freelancer</th><th>Bid</th><th>Status</th></tr></thead>
        <tbody>{data.proposals.length ? data.proposals.map((proposal) => <tr key={proposal.id}>
          <td>{data.projectById.get(String(proposal.projectId))?.title || 'Unknown project'}</td>
          <td>{data.userById.get(String(proposal.freelancerId))?.name || 'Unknown freelancer'}</td>
          <td>{formatCurrency(proposal.bidAmount)}</td><td><Badge status={proposal.status} /></td>
        </tr>) : <tr><td colSpan="4" className="admin-empty">No proposals found.</td></tr>}</tbody>
      </table></div>
    </section>}
  </section>;
}
