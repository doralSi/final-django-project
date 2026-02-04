import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/date';
import Button from './Button';
import Alert from './Alert';

const CommentItem = ({ comment, onUpdate, onDelete }) => {
  const { user, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isOwner = user?.id === comment.author;
  const canEdit = isOwner;
  const canDelete = isOwner || isAdmin;

  const handleEdit = async () => {
    if (!editContent.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onUpdate(comment.id, { content: editContent });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.content?.[0] || 'Failed to update comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    setLoading(true);
    try {
      await onDelete(comment.id);
    } catch (err) {
      setError('Failed to delete comment');
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
    setError('');
  };

  return (
    <div className="card" style={{ marginBottom: 'var(--spacing-md)' }}>
      <div className="meta">
        {comment.author_username || 'Anonymous'} • {formatDate(comment.created_at)}
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {isEditing ? (
        <div>
          <textarea
            className="form-textarea"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            disabled={loading}
          />
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)' }}>
            <Button onClick={handleEdit} disabled={loading} size="sm">
              Save
            </Button>
            <Button onClick={handleCancelEdit} variant="secondary" disabled={loading} size="sm">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-content">
            <p>{comment.content}</p>
          </div>

          {(canEdit || canDelete) && (
            <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)' }}>
              {canEdit && (
                <Button onClick={() => setIsEditing(true)} variant="secondary" size="sm">
                  Edit
                </Button>
              )}
              {canDelete && (
                <Button onClick={handleDelete} variant="danger" size="sm" disabled={loading}>
                  Delete
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
