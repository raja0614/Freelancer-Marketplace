// All browser storage reads and writes live in this module.
export function getAll(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

export function saveAll(key, items) {
  try { localStorage.setItem(key, JSON.stringify(Array.isArray(items) ? items : [])); }
  catch { /* A full or unavailable store should not break rendering. */ }
}

export function addItem(key, item) {
  const items = getAll(key);
  items.push(item);
  saveAll(key, items);
  return item;
}

export function updateItem(key, id, updates) {
  const items = getAll(key);
  const index = items.findIndex((item) => String(item.id) === String(id));
  if (index < 0) return null;
  items[index] = { ...items[index], ...updates };
  saveAll(key, items);
  return items[index];
}

export function removeItem(key, id) {
  const items = getAll(key);
  const remaining = items.filter((item) => String(item.id) !== String(id));
  saveAll(key, remaining);
  return remaining.length !== items.length;
}

export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user && typeof user === 'object' && !Array.isArray(user) ? user : null;
  }
  catch { return null; }
}

export function setCurrentUser(user) {
  if (user) {
    try { localStorage.setItem('currentUser', JSON.stringify(user)); }
    catch { /* Ignore unavailable storage. */ }
  } else clearCurrentUser();
}

export function clearCurrentUser() {
  try { localStorage.removeItem('currentUser'); } catch { /* Ignore unavailable storage. */ }
}

// Seed flags use these helpers so no other module touches localStorage.
export function getStorageFlag(key) {
  try { return localStorage.getItem(key) === 'true'; } catch { return false; }
}

export function setStorageFlag(key) {
  try { localStorage.setItem(key, 'true'); } catch { /* Ignore unavailable storage. */ }
}
