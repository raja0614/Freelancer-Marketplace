import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="not-found-page card" aria-labelledby="not-found-title">
    <span className="not-found-code" aria-hidden="true">404</span>
    <p className="eyebrow">Page unavailable</p>
    <h1 id="not-found-title">We can’t find that page</h1>
    <p className="muted-copy">The link may be incorrect, or the page may have moved. Head back to SkillBridge and continue from there.</p>
    <Link className="btn btn-primary" to="/">Return to SkillBridge</Link>
  </section>;
}
