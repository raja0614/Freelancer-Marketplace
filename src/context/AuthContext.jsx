import { createContext, useContext, useState } from 'react';
import { addItem, clearCurrentUser, getAll, getCurrentUser, setCurrentUser } from '../services/storage';
import { generateId, isValidEmail } from '../utils/helpers';

const AuthContext = createContext(null);
const USER_ROLES = ['client', 'freelancer'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  function signup(data = {}) {
    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const password = String(data.password || '');
    const role = String(data.role || '').trim().toLowerCase();
    const errors = {};

    if (!name) errors.name = 'Full name is required.';
    if (!email) errors.email = 'Email address is required.';
    else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
    if (!USER_ROLES.includes(role)) errors.role = 'Choose client or freelancer.';

    const emailExists = getAll('users').some((item) =>
      String(item.email || '').toLowerCase() === email.toLowerCase()
    );
    if (!errors.email && emailExists) errors.email = 'An account with this email already exists.';

    if (Object.keys(errors).length) return { ok: false, errors };

    addItem('users', {
      id: generateId('user'), name, email, password, role,
      bio: '', skills: [], portfolio: [], createdAt: new Date().toISOString()
    });
    return { ok: true, errors: {} };
  }

  function login(email, password) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const found = getAll('users').find((item) =>
      String(item.email || '').toLowerCase() === cleanEmail && item.password === password
    );
    if (!found) return { ok: false, user: null, error: 'Invalid email or password.' };
    setCurrentUser(found);
    setUser(found);
    return { ok: true, user: found, error: '' };
  }

  function logout() {
    clearCurrentUser();
    setUser(null);
  }

  function refreshUser() {
    const current = getCurrentUser() || user;
    if (!current) return null;
    const latest = getAll('users').find((item) => String(item.id) === String(current.id));
    if (!latest) {
      clearCurrentUser();
      setUser(null);
      return null;
    }
    setCurrentUser(latest);
    setUser(latest);
    return latest;
  }

  return <AuthContext.Provider value={{ user, signup, login, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
