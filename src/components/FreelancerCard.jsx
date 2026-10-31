import { Link } from 'react-router-dom';
import Badge from './Badge';

export default function FreelancerCard({ freelancer }) {
  if (!freelancer) return null;
  return <article className="card freelancer-card">
    <div className="freelancer-card-heading">
      <div className="avatar" aria-hidden="true">{(freelancer.name || 'F').charAt(0).toUpperCase()}</div>
      <div><h3>{freelancer.name}</h3><Badge status="ACCEPTED" label="Freelancer" /></div>
    </div>
    <p className="card-description">{freelancer.bio || 'This freelancer has not added a bio yet.'}</p>
    <div className="skill-list">
      {(freelancer.skills || []).map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
    </div>
    <Link className="card-link" to={`/client/freelancers/${freelancer.id}`}>View profile</Link>
  </article>;
}
