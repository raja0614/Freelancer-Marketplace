import { getAll, updateItem, getCurrentUser, setCurrentUser } from './storage.js';
import { skillsToArray } from '../utils/helpers.js';

export function getUserById(userId) {
  if (!userId) return null;
  return getAll('users').find((user) => String(user.id) === String(userId)) || null;
}

export function updateUserProfile(userId, profileData = {}) {
  if (!userId) return null;
  const updates = {};
  if (profileData.name !== undefined) updates.name = String(profileData.name).trim();
  if (profileData.bio !== undefined) updates.bio = String(profileData.bio).trim();
  if (profileData.skills !== undefined) updates.skills = skillsToArray(profileData.skills);
  if (profileData.portfolio !== undefined) updates.portfolio = Array.isArray(profileData.portfolio) ? profileData.portfolio : [];
  const updatedUser = updateItem('users', userId, updates);
  const currentUser = getCurrentUser();
  if (updatedUser && currentUser && String(currentUser.id) === String(userId)) setCurrentUser(updatedUser);
  return updatedUser;
}

export function getFreelancers() {
  return getAll('users').filter((user) => user.role === 'freelancer');
}

export function filterFreelancers(list, { keyword = '', skill = '' } = {}) {
  const keywordQuery = String(keyword).trim().toLowerCase();
  const skillQuery = String(skill).trim().toLowerCase();
  return (Array.isArray(list) ? list : []).filter((freelancer) => {
    const matchesKeyword = !keywordQuery || `${freelancer.name || ''} ${freelancer.bio || ''}`.toLowerCase().includes(keywordQuery);
    const matchesSkill = !skillQuery || (Array.isArray(freelancer.skills) && freelancer.skills.some((item) => String(item).toLowerCase().includes(skillQuery)));
    return matchesKeyword && matchesSkill;
  });
}
