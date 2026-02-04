import { useState, useEffect } from 'react';
import { getArticles } from '../api/endpoints';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticles({ page_size: 3, ordering: '-created_at' });
      setArticles(response.data.results || []);
    } catch (err) {
      setError('Failed to load articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome to Our Blog</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Discover the latest articles from our community
        </p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {articles.length === 0 ? (
        <Alert type="info" message="No articles available yet." />
      ) : (
        <div>
          <h2 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
            Latest Articles
          </h2>
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
