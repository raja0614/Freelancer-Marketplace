import { getAll, saveAll, getStorageFlag, setStorageFlag } from './storage.js';

const clients = [
  { id: 'client_1', name: 'Ananya Mehta', email: 'ananya@jaipurspice.in', password: 'client123', role: 'client', bio: 'Runs a family spice and pantry shop in Jaipur.', skills: [], portfolio: [] },
  { id: 'client_2', name: 'Rohan Kulkarni', email: 'rohan@punebloom.in', password: 'client123', role: 'client', bio: 'Building a local flower delivery business in Pune.', skills: [], portfolio: [] },
  { id: 'client_3', name: 'Meera Nair', email: 'meera@coastalcrafters.in', password: 'client123', role: 'client', bio: 'Sells handmade home goods from Kochi artisans.', skills: [], portfolio: [] }
];

const freelancers = [
  { id: 'freelancer_1', name: 'Aarav Sharma', email: 'aarav@skillbridge.in', password: 'freelancer123', role: 'freelancer', bio: 'Creates clean online stores for independent brands.', skills: ['React', 'Shopify', 'UI Design'], portfolio: [] },
  { id: 'freelancer_2', name: 'Priya Iyer', email: 'priya@skillbridge.in', password: 'freelancer123', role: 'freelancer', bio: 'Writes product stories and search-friendly content.', skills: ['Copywriting', 'SEO', 'Content'], portfolio: [] },
  { id: 'freelancer_3', name: 'Kabir Khan', email: 'kabir@skillbridge.in', password: 'freelancer123', role: 'freelancer', bio: 'Designs memorable identities for growing businesses.', skills: ['Branding', 'Illustrator', 'Logo Design'], portfolio: [] },
  { id: 'freelancer_4', name: 'Sana Das', email: 'sana@skillbridge.in', password: 'freelancer123', role: 'freelancer', bio: 'Builds lightweight websites and helpful automations.', skills: ['JavaScript', 'WordPress', 'SEO'], portfolio: [] }
];

const projects = [
  { id: 'project_1', clientId: 'client_1', title: 'Jaipur spice shop online store', description: 'Set up a simple product catalogue and checkout for our small-batch masalas.', skillsNeeded: ['Shopify', 'UI Design'], budget: 28000, deadline: '2026-12-20', status: 'IN_PROGRESS', acceptedProposalId: 'proposal_1' },
  { id: 'project_2', clientId: 'client_2', title: 'Pune flower delivery brand identity', description: 'Create a friendly logo and packaging look for same-day flower orders.', skillsNeeded: ['Branding', 'Logo Design'], budget: 18000, deadline: '2026-12-12', status: 'OPEN', acceptedProposalId: null },
  { id: 'project_3', clientId: 'client_3', title: 'Handmade decor product descriptions', description: 'Write clear product stories for our coconut-shell and coir homeware range.', skillsNeeded: ['Copywriting', 'SEO'], budget: 12000, deadline: '2026-12-15', status: 'OPEN', acceptedProposalId: null },
  { id: 'project_4', clientId: 'client_1', title: 'Festival gift hamper landing page', description: 'A mobile-first campaign page for our festive spice gift boxes.', skillsNeeded: ['React', 'Content'], budget: 22000, deadline: '2026-12-28', status: 'OPEN', acceptedProposalId: null },
  { id: 'project_5', clientId: 'client_2', title: 'Local flower shop SEO refresh', description: 'Improve local search listings and service pages for Pune neighbourhoods.', skillsNeeded: ['SEO', 'Content'], budget: 15000, deadline: '2027-01-10', status: 'OPEN', acceptedProposalId: null },
  { id: 'project_6', clientId: 'client_3', title: 'Coastal Crafters WordPress updates', description: 'Refresh our catalogue pages and make the site easier to use on phones.', skillsNeeded: ['WordPress', 'UI Design'], budget: 20000, deadline: '2027-01-05', status: 'OPEN', acceptedProposalId: null }
];

const proposals = [
  { id: 'proposal_1', projectId: 'project_1', freelancerId: 'freelancer_1', message: 'I can set up your catalogue with clear spice categories and a smooth mobile checkout.', bidAmount: 26000, status: 'ACCEPTED' },
  { id: 'proposal_2', projectId: 'project_1', freelancerId: 'freelancer_4', message: 'I can build a compact storefront and help prepare the product pages for search.', bidAmount: 24000, status: 'REJECTED' },
  { id: 'proposal_3', projectId: 'project_2', freelancerId: 'freelancer_3', message: 'I will develop a bright visual identity that works across labels and delivery bags.', bidAmount: 17000, status: 'PENDING' },
  { id: 'proposal_4', projectId: 'project_3', freelancerId: 'freelancer_2', message: 'I can write warm, concise descriptions that explain the makers and materials.', bidAmount: 11000, status: 'PENDING' },
  { id: 'proposal_5', projectId: 'project_5', freelancerId: 'freelancer_2', message: 'I will map local search terms and update the service copy for Pune customers.', bidAmount: 14000, status: 'PENDING' }
];

const admin = {
  id: 'u_admin_skillbridge', name: 'SkillBridge Admin', email: 'admin@skillbridge.com',
  password: 'admin123', role: 'admin', bio: '', skills: [], portfolio: [],
  createdAt: '2026-01-01T00:00:00.000Z'
};

export function seedData() {
  if (getStorageFlag('skillbridgeSeeded')) return false;
  const timestamp = new Date().toISOString();
  saveAll('users', [...getAll('users'), admin, ...clients, ...freelancers].map((user) => ({ createdAt: timestamp, ...user })));
  saveAll('projects', [...getAll('projects'), ...projects.map((project) => ({ ...project, createdAt: timestamp }))]);
  saveAll('proposals', [...getAll('proposals'), ...proposals.map((proposal) => ({ ...proposal, createdAt: timestamp }))]);
  setStorageFlag('skillbridgeSeeded');
  return true;
}
