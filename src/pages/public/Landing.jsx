import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';

const tracks = [
  {
    status: 'IN_PROGRESS', label: 'For Clients',
    title: 'Find the right freelancer for your project',
    steps: [
      ['Post a project', 'Share the work, budget, and skills you need.'],
      ['Review proposals', 'Compare bids and freelancer profiles.'],
      ['Choose a freelancer', 'Accept the proposal that fits your project.']
    ]
  },
  {
    status: 'COMPLETED', label: 'For Freelancers',
    title: 'Find projects that fit your skills',
    steps: [
      ['Build your profile', 'Add a short bio, skills, and portfolio links.'],
      ['Browse open projects', 'Explore work posted by clients.'],
      ['Send a proposal', 'Introduce your approach and submit your bid.']
    ]
  }
];

export default function Landing() {
  return <>
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-badge-wrap"><Badge status="OPEN" label="Freelancer Marketplace" /></div>
        <h1 className="hero-title">Connecting Talent with <span>Opportunity</span></h1>
        <p className="hero-problem">Small businesses can struggle to find independent talent, while freelancers can struggle to discover projects that fit their skills.</p>
        <p className="hero-solution">SkillBridge brings clients and freelancers together through project listings and proposals.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/signup">Get Started</Link>
          <a className="btn btn-outline" href="#how-it-works">How it works</a>
        </div>
      </div>
    </section>

    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">A simple proposal-based marketplace for clients and independent freelancers.</p>
        </header>
        <div className="tracks-grid">
          {tracks.map((track) => <article className="card track-card" key={track.label}>
            <div className="track-header"><Badge status={track.status} label={track.label} /></div>
            <h3 className="track-title">{track.title}</h3>
            <ol className="track-steps">
              {track.steps.map(([title, description], index) => <li className="track-step" key={title}>
                <span className="step-number">{index + 1}</span>
                <div><h4 className="step-title">{title}</h4><p className="step-desc">{description}</p></div>
              </li>)}
            </ol>
          </article>)}
        </div>
      </div>
    </section>
  </>;
}
