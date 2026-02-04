import { Link } from 'react-router-dom';
import { formatDateShort } from '../utils/date';

const ArticleCard = ({ article }) => {
  const excerpt = article.content?.substring(0, 150) + (article.content?.length > 150 ? '...' : '');
  const tags = typeof article.tags === 'string' ? article.tags.split(',').map(t => t.trim()) : (article.tags || []);

  return (
    <div className="card">
      <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 className="card-title">{article.title}</h2>
      </Link>
      
      <div className="meta">
        By {article.author_username || article.author} • {formatDateShort(article.created_at)}
      </div>

      <div className="card-content">
        <p>{excerpt}</p>
      </div>

      {tags.length > 0 && (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
          {tags.map((tag, index) => (
            tag && <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
