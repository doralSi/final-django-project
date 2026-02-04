import { useState } from 'react';
import Button from './Button';
import Alert from './Alert';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit({ content });
      setContent('');
    } catch (err) {
      setError(err.response?.data?.content?.[0] || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add a Comment</h3>
      
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="form-group">
        <textarea
          className="form-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          disabled={loading}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        Post Comment
      </Button>
    </form>
  );
};

export default CommentForm;
