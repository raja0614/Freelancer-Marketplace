export function generateId(prefix = 'id') {
  return `${prefix || 'id'}_${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function formatDate(date) {
  if (!date) return '';
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toLocaleDateString('en-IN');
}

export function formatCurrency(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(value);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

export function skillsToArray(skills) {
  const values = Array.isArray(skills) ? skills : String(skills || '').split(',');
  return values.map((skill) => String(skill).trim()).filter(Boolean);
}
