// ── Helper Utilities ──

export function formatDate(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateGrade(percentage) {
  if (percentage >= 90) return { grade: 'A+', color: '#10b981' };
  if (percentage >= 80) return { grade: 'A', color: '#22c55e' };
  if (percentage >= 70) return { grade: 'B+', color: '#3b82f6' };
  if (percentage >= 60) return { grade: 'B', color: '#6366f1' };
  if (percentage >= 50) return { grade: 'C', color: '#f59e0b' };
  if (percentage >= 40) return { grade: 'D', color: '#f97316' };
  return { grade: 'F', color: '#ef4444' };
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str, length = 50) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function getAttendanceColor(percentage) {
  if (percentage >= 90) return '#10b981';
  if (percentage >= 75) return '#3b82f6';
  if (percentage >= 60) return '#f59e0b';
  return '#ef4444';
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

export function getStatusBadge(status) {
  const map = {
    paid: 'badge-success',
    pending: 'badge-warning',
    overdue: 'badge-danger',
    present: 'badge-success',
    absent: 'badge-danger',
    late: 'badge-warning',
    active: 'badge-success',
    inactive: 'badge-danger',
  };
  return map[status?.toLowerCase()] || 'badge-info';
}

export const CLASSES = [
  '1-A', '1-B', '2-A', '2-B', '3-A', '3-B',
  '4-A', '4-B', '5-A', '5-B', '6-A', '6-B',
  '7-A', '7-B', '8-A', '8-B', '9-A', '9-B',
  '10-A', '10-B', '11-Sci', '11-Com', '12-Sci', '12-Com',
];

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'English', 'Hindi', 'History', 'Geography',
  'Computer Science', 'Economics', 'Accountancy',
  'Physical Education', 'Art', 'Music',
];
