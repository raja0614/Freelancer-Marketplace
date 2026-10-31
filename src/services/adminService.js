import { getAll, removeItem, saveAll } from './storage.js';

export function getStats() {
  const users = getAll('users');
  const projects = getAll('projects');
  const proposals = getAll('proposals');
  return {
    totalUsers: users.length,
    totalClients: users.filter((user) => user.role === 'client').length,
    totalFreelancers: users.filter((user) => user.role === 'freelancer').length,
    totalProjects: projects.length,
    totalProposals: proposals.length,
    projectsByStatus: {
      OPEN: projects.filter((project) => project.status === 'OPEN').length,
      IN_PROGRESS: projects.filter((project) => project.status === 'IN_PROGRESS').length,
      COMPLETED: projects.filter((project) => project.status === 'COMPLETED').length
    }
  };
}

export function removeUser(userId) {
  return removeItem('users', userId);
}

export function removeProject(projectId) {
  const removed = removeItem('projects', projectId);
  if (!removed) return false;
  saveAll('proposals', getAll('proposals').filter((proposal) => String(proposal.projectId) !== String(projectId)));
  return true;
}
