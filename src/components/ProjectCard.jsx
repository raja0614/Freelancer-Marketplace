import { Link } from 'react-router-dom';
import Badge from './Badge';
import { formatCurrency } from '../utils/helpers';

export default function ProjectCard({ project }) {
  if (!project) return null;
  return <article className="card project-card">
    <div className="project-card-heading">
      <h3>{project.title}</h3>
      <Badge status={project.status} />
    </div>
    <p className="card-description">{project.description}</p>
    <div className="skill-list">
      {(project.skillsNeeded || []).map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
    </div>
    <div className="project-card-footer">
      <strong>{formatCurrency(project.budget)}</strong>
      <Link to={`/projects/${project.id}`}>View project</Link>
    </div>
  </article>;
}
