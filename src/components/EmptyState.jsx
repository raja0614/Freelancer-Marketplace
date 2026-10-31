export default function EmptyState({ message = 'There is nothing to show yet.' }) {
  return <div className="empty-state" role="status">{message}</div>;
}
