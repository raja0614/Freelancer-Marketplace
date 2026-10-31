import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { getUserById } from '../../services/userService';

export default function FreelancerProfile() {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    const user = getUserById(id);
    setFreelancer(user?.role === 'freelancer' ? user : null);
  }, [id]);

  if (!freelancer) return <section className="profile-not-found">
    <Badge status="REJECTED" label="Not found" />
    <h1>Freelancer profile not found</h1>
    <p>The requested profile could not be found.</p>
    <Link className="btn btn-primary" to="/client/freelancers">Back to freelancers</Link>
  </section>;

  return <section className="freelancer-profile-page">
    <Link className="back-link" to="/client/freelancers">← Browse freelancers</Link>
    <article className="card profile-summary">
      <div className="avatar avatar-large">{(freelancer.name || 'F').charAt(0).toUpperCase()}</div>
      <div><div className="profile-title"><h1>{freelancer.name}</h1><Badge status="ACCEPTED" label="Freelancer" /></div><p>{freelancer.bio || 'This freelancer has not added a biography yet.'}</p></div>
    </article>

    <section className="card profile-section">
      <h2>Skills &amp; expertise</h2>
      {freelancer.skills?.length ? <div className="skill-list">{freelancer.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div> : <EmptyState message="No skills listed yet." />}
    </section>

    <section className="profile-section">
      <h2>Portfolio</h2>
      {freelancer.portfolio?.length ? <div className="portfolio-grid">{freelancer.portfolio.map((item, index) => <article className="card portfolio-card" key={`${item.url || item.title || 'work'}-${index}`}>
        <h3>{item.title || 'Portfolio item'}</h3>
        {item.description && <p>{item.description}</p>}
        {item.url && <a href={item.url} target="_blank" rel="noreferrer">View project ↗</a>}
      </article>)}</div> : <EmptyState message="No portfolio items have been added to this profile yet." />}
    </section>
  </section>;
}
