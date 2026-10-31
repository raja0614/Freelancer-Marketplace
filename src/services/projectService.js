import { getAll, addItem } from './storage.js';
import { generateId, skillsToArray } from '../utils/helpers.js';

export function getProjectById(projectId) {
  if (!projectId) return null;
  return getAll('projects').find((project) => String(project.id) === String(projectId)) || null;
}

export function getProjectsByClient(clientId) {
  if (!clientId) return [];
  return getAll('projects')
    .filter((project) => String(project.clientId) === String(clientId))
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

export function getOpenProjects() {
  return getAll('projects')
    .filter((project) => String(project.status || '').toUpperCase() === 'OPEN')
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

export function createProject(data = {}) {
  const project = {
    id: generateId('pr'),
    clientId: data.clientId,
    title: String(data.title || '').trim(),
    description: String(data.description || '').trim(),
    skillsNeeded: skillsToArray(data.skillsNeeded),
    budget: Number(data.budget) || 0,
    deadline: data.deadline || '',
    status: 'OPEN',
    acceptedProposalId: null,
    createdAt: new Date().toISOString()
  };
  return addItem('projects', project);
}

export function filterProjects(list, { keyword = '', skill = '' } = {}) {
  const keywordQuery = String(keyword).trim().toLowerCase();
  const skillQuery = String(skill).trim().toLowerCase();
  return (Array.isArray(list) ? list : []).filter((project) => {
    const matchesKeyword = !keywordQuery || `${project.title || ''} ${project.description || ''}`.toLowerCase().includes(keywordQuery);
    const matchesSkill = !skillQuery || (Array.isArray(project.skillsNeeded) && project.skillsNeeded.some((item) => String(item).toLowerCase().includes(skillQuery)));
    return matchesKeyword && matchesSkill;
  });
}
