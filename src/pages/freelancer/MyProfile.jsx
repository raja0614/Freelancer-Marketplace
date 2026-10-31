import { useEffect, useState } from 'react';
import FormField from '../../components/FormField';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { updateUserProfile } from '../../services/userService';

const blankPortfolioItem = { title: '', description: '', url: '' };

export default function MyProfile() {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [bio, setBio] = useState(user.bio || '');
  const [skills, setSkills] = useState((user.skills || []).join(', '));
  const [portfolio, setPortfolio] = useState(Array.isArray(user.portfolio) ? user.portfolio : []);
  const [newItem, setNewItem] = useState(blankPortfolioItem);
  const [itemError, setItemError] = useState('');

  useEffect(() => {
    setBio(user.bio || '');
    setSkills((user.skills || []).join(', '));
    setPortfolio(Array.isArray(user.portfolio) ? user.portfolio : []);
  }, [user]);

  function addPortfolioItem() {
    if (!newItem.title.trim()) { setItemError('A portfolio title is required.'); return; }
    setPortfolio((items) => [...items, {
      title: newItem.title.trim(),
      description: newItem.description.trim(),
      url: newItem.url.trim()
    }]);
    setNewItem(blankPortfolioItem);
    setItemError('');
  }

  function saveProfile(event) {
    event.preventDefault();
    const updated = updateUserProfile(user.id, { bio, skills, portfolio });
    if (!updated) { showToast('Could not save your profile.', 'error'); return; }
    refreshUser();
    showToast('Profile saved successfully.', 'success');
  }

  return <section className="form-page freelancer-profile-edit">
    <header className="page-heading">
      <span className="badge badge-completed">Freelancer workspace</span>
      <h1>My profile</h1>
      <p>Show clients what you do and the work you have completed.</p>
    </header>

    <form className="card project-form" onSubmit={saveProfile}>
      <FormField as="textarea" label="Bio" name="bio" rows="5" value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Introduce yourself and your areas of expertise." />
      <p className="field-hint">This bio appears on your public freelancer profile.</p>
      <FormField label="Skills (comma-separated)" name="skills" value={skills} onChange={(event) => setSkills(event.target.value)} placeholder="e.g. React, UI Design, SEO" />

      <section className="portfolio-editor" aria-labelledby="portfolio-heading">
        <div className="section-heading-row"><div><h2 id="portfolio-heading">Portfolio items</h2><p>Add examples of your previous work.</p></div></div>
        {portfolio.length ? <div className="portfolio-list">{portfolio.map((item, index) => <article className="portfolio-item card" key={`${item.title || 'work'}-${index}`}>
          <div><h3>{item.title || 'Portfolio item'}</h3>{item.description && <p>{item.description}</p>}{item.url && <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>}</div>
          <button className="btn btn-outline remove-portfolio" type="button" onClick={() => setPortfolio((items) => items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
        </article>)}</div> : <EmptyState message="No portfolio items added yet." />}

        <div className="portfolio-add-form">
          <h3>Add a portfolio item</h3>
          <FormField label="Title" name="portfolioTitle" value={newItem.title} error={itemError} onChange={(event) => { setNewItem((item) => ({ ...item, title: event.target.value })); setItemError(''); }} placeholder="Project or deliverable title" />
          <FormField as="textarea" label="Description" name="portfolioDescription" rows="3" value={newItem.description} onChange={(event) => setNewItem((item) => ({ ...item, description: event.target.value }))} placeholder="Briefly describe the work." />
          <FormField label="Link (optional)" name="portfolioUrl" type="url" value={newItem.url} onChange={(event) => setNewItem((item) => ({ ...item, url: event.target.value }))} placeholder="https://example.com" />
          <button className="btn btn-outline" type="button" onClick={addPortfolioItem}>Add to portfolio</button>
        </div>
      </section>

      <div className="form-actions"><button className="btn btn-primary" type="submit">Save profile</button></div>
    </form>
  </section>;
}
