const statusClasses = {
  OPEN: 'badge-open',
  IN_PROGRESS: 'badge-in-progress',
  COMPLETED: 'badge-completed',
  PENDING: 'badge-pending',
  ACCEPTED: 'badge-accepted',
  REJECTED: 'badge-rejected'
};

export default function Badge({ status = 'OPEN', label }) {
  const normalizedStatus = String(status).toUpperCase();
  const className = statusClasses[normalizedStatus] || 'badge-open';
  const text = label || normalizedStatus.replaceAll('_', ' ');
  return <span className={`badge ${className}`}>{text}</span>;
}
