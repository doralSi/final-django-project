import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, getArticleComments, createComment, updateComment, deleteComment } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/date';
import CommentItem from '../components/CommentItem';
import CommentForm from '../components/CommentForm';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const ArticleDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await getArticle(id);
      setArticle(response.data);
    } catch (err) {
      setError('Failed to load article');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await getArticleComments(id, { ordering: '-created_at' });
      setComments(response.data.results || response.data || []);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleCommentSubmit = async (data) => {
    await createComment(id, data);
    await fetchComments();
  };

  const handleCommentUpdate = async (commentId, data) => {
    await updateComment(commentId, data);
    await fetchComments();
  };

  const handleCommentDelete = async (commentId) => {
    await deleteComment(commentId);
    await fetchComments();
  };

  if (loading) return <Loader />;
  if (!article) return <Alert type="error" message="Article not found" />;

  const tags = typeof article.tags === 'string' 
    ? article.tags.split(',').map(t => t.trim()) 
    : (article.tags || []);

  return (
    <div>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <article className="card">
        <h1 className="page-title">{article.title}</h1>
        
        <div className="meta" style={{ marginBottom: 'var(--spacing-lg)' }}>
          By {article.author_username || article.author} • {formatDate(article.created_at)}
        </div>

        {tags.length > 0 && (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            {tags.map((tag, index) => (
              tag && <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
          {article.content}
        </div>
      </article>

      <div style={{ marginTop: 'var(--spacing-2xl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
          Comments ({comments.length})
        </h2>

        {isAuthenticated && (
          <CommentForm onSubmit={handleCommentSubmit} />
        )}

        {!isAuthenticated && (
          <Alert type="info" message="Please login to post a comment." />
        )}

        {commentsLoading ? (
          <Loader />
        ) : comments.length === 0 ? (
          <Alert type="info" message="No comments yet. Be the first to comment!" />
        ) : (
          <div style={{ marginTop: 'var(--spacing-xl)' }}>
            {comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onUpdate={handleCommentUpdate}
                onDelete={handleCommentDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetails;
