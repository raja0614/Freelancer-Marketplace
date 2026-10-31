import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/EmptyState';
import ProjectCard from '../../components/ProjectCard';
import { useAuth } from '../../context/AuthContext';
import { getProjectsByClient } from '../../services/projectService';

export default function MyProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(getProjectsByClient(user.id));
  }, [user.id]);

  return <section>
    <header className="page-heading page-heading-action">
      <div><span className="badge badge-open">Client workspace</span><h1>My projects</h1><p>Review your project listings and proposals from freelancers.</p></div>
      <Link className="btn btn-primary" to="/client/post-project">Post a project</Link>
    </header>
    {projects.length ? <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <EmptyState message="You have not posted any projects yet. Create a listing to get started." />}
  </section>;
}
