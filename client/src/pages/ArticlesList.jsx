import { useState, useEffect } from 'react';
import { getArticles } from '../api/endpoints';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
  
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('-created_at');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [search, ordering, pageSize]);

  const fetchArticles = async (url = null) => {
    try {
      setLoading(true);
      setError('');

      let response;
      if (url) {
        // Fetch specific page URL
        response = await fetch(url);
        const data = await response.json();
        setArticles(data.results || []);
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous
        });
      } else {
        // Fetch with params
        const params = {
          ordering,
          page_size: pageSize,
        };
        if (search) params.search = search;

        response = await getArticles(params);
        setArticles(response.data.results || []);
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous
        });
        setCurrentPage(1);
      }
    } catch (err) {
      setError('Failed to load articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  const handlePageChange = (url) => {
    // Extract page number from URL if possible
    const urlObj = new URL(url);
    const page = urlObj.searchParams.get('page');
    if (page) setCurrentPage(parseInt(page));
    
    fetchArticles(url);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">All Articles</h1>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="search-filters">
        <form onSubmit={handleSearch} style={{ flex: 2, display: 'flex', gap: 'var(--spacing-sm)' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <select
          className="form-select"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="-created_at">Newest First</option>
          <option value="created_at">Oldest First</option>
          <option value="title">Title A-Z</option>
          <option value="-title">Title Z-A</option>
        </select>

        <select
          className="form-select"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <Alert type="info" message="No articles found." />
      ) : (
        <>
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}

          <Pagination
            count={pagination.count}
            next={pagination.next}
            previous={pagination.previous}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </>
      )}
    </div>
  );
};

export default ArticlesList;
