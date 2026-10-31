import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../../components/EmptyState';
import FormField from '../../components/FormField';
import ProjectCard from '../../components/ProjectCard';
import { filterProjects, getOpenProjects } from '../../services/projectService';

export default function BrowseProjects() {
  const [projects, setProjects] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [skill, setSkill] = useState('');

  useEffect(() => {
    setProjects(getOpenProjects());
  }, []);

  const filteredProjects = useMemo(
    () => filterProjects(projects, { keyword, skill }),
    [projects, keyword, skill]
  );

  return <section>
    <header className="page-heading">
      <span className="badge badge-open">Freelancer workspace</span>
      <h1>Browse open projects</h1>
      <p>Search client opportunities by project details or required skills.</p>
    </header>
    <div className="card freelancer-filters">
      <FormField label="Search projects" name="keyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Title or description" />
      <FormField label="Filter by skill" name="skill" value={skill} onChange={(event) => setSkill(event.target.value)} placeholder="e.g. React" />
    </div>
    {filteredProjects.length ? <div className="project-grid">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <EmptyState message="No open projects match these filters. Try a different keyword or skill." />}
  </section>;
}
