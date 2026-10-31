import { getAll, addItem, saveAll, updateItem } from './storage.js';
import { generateId } from '../utils/helpers.js';

export function hasProposed(projectId, freelancerId) {
  if (!projectId || !freelancerId) return false;
  return getAll('proposals').some((proposal) => String(proposal.projectId) === String(projectId) && String(proposal.freelancerId) === String(freelancerId));
}

export function submitProposal(projectId, freelancerId, message, bidAmount) {
  if (!projectId || !freelancerId) return { success: false, error: 'Project ID and freelancer ID are required.' };
  if (hasProposed(projectId, freelancerId)) return { success: false, error: 'You have already submitted a proposal for this project.' };
  const cleanMessage = String(message || '').trim();
  const amount = Number(bidAmount);
  if (!cleanMessage) return { success: false, error: 'Proposal message cannot be empty.' };
  if (!Number.isFinite(amount) || amount <= 0) return { success: false, error: 'Please specify a valid bid amount.' };
  const proposal = {
    id: generateId('pp'), projectId: String(projectId), freelancerId: String(freelancerId),
    message: cleanMessage, bidAmount: amount, status: 'PENDING', createdAt: new Date().toISOString()
  };
  addItem('proposals', proposal);
  return { success: true, proposal };
}

export function getProposalsForProject(projectId) {
  if (!projectId) return [];
  return getAll('proposals').filter((proposal) => String(proposal.projectId) === String(projectId));
}

export function getProposalsForFreelancer(freelancerId) {
  if (!freelancerId) return [];
  return getAll('proposals')
    .filter((proposal) => String(proposal.freelancerId) === String(freelancerId))
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

export function acceptProposal(proposalId) {
  if (!proposalId) return false;
  const proposals = getAll('proposals');
  const target = proposals.find((proposal) => String(proposal.id) === String(proposalId));
  if (!target) return false;
  proposals.forEach((proposal) => {
    if (String(proposal.projectId) === String(target.projectId)) {
      proposal.status = String(proposal.id) === String(proposalId) ? 'ACCEPTED' : 'REJECTED';
    }
  });
  saveAll('proposals', proposals);
  const projects = getAll('projects');
  const project = projects.find((item) => String(item.id) === String(target.projectId));
  if (!project) return false;
  updateItem('projects', target.projectId, { status: 'IN_PROGRESS', acceptedProposalId: String(proposalId) });
  return true;
}

export function rejectProposal(proposalId) {
  if (!proposalId) return false;
  return updateItem('proposals', proposalId, { status: 'REJECTED' }) !== null;
}

export function markProjectCompleted(projectId, freelancerId) {
  if (!projectId || !freelancerId) return false;
  const project = getAll('projects').find((item) => String(item.id) === String(projectId));
  if (!project || !project.acceptedProposalId) return false;
  const accepted = getAll('proposals').find((proposal) => String(proposal.id) === String(project.acceptedProposalId));
  if (!accepted || String(accepted.freelancerId) !== String(freelancerId)) return false;
  return updateItem('projects', projectId, { status: 'COMPLETED' }) !== null;
}
