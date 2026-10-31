import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../../components/EmptyState';
import FreelancerCard from '../../components/FreelancerCard';
import FormField from '../../components/FormField';
import { getFreelancers, filterFreelancers } from '../../services/userService';

export default function BrowseFreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [skill, setSkill] = useState('');

  useEffect(() => {
    setFreelancers(getFreelancers());
  }, []);

  const filteredFreelancers = useMemo(
    () => filterFreelancers(freelancers, { keyword, skill }),
    [freelancers, keyword, skill]
  );

  return <section>
    <header className="page-heading">
      <span className="badge badge-open">Client workspace</span>
      <h1>Browse freelancers</h1>
      <p>Explore independent talent and search by name, bio, or skill.</p>
    </header>
    <div className="card freelancer-filters">
      <FormField label="Search freelancers" name="keyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Name or keyword" />
      <FormField label="Filter by skill" name="skill" value={skill} onChange={(event) => setSkill(event.target.value)} placeholder="e.g. React" />
    </div>
    {filteredFreelancers.length ? <div className="freelancer-grid">{filteredFreelancers.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} />)}</div> : <EmptyState message="No freelancers match these filters. Try another name or skill." />}
  </section>;
}
