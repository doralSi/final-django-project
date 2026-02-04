import { useState, useEffect } from 'react';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../api/endpoints';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
  
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('-created_at');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [search, ordering, pageSize]);

  const fetchArticles = async (url = null) => {
    try {
      setLoading(true);
      setError('');

      let response;
      if (url) {
        response = await fetch(url);
        const data = await response.json();
        setArticles(data.results || []);
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous
        });
      } else {
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
    const urlObj = new URL(url);
    const page = urlObj.searchParams.get('page');
    if (page) setCurrentPage(parseInt(page));
    
    fetchArticles(url);
    window.scrollTo(0, 0);
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setFormData({ title: '', content: '', tags: '' });
    setFormErrors({});
    setShowForm(true);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      tags: article.tags || '',
    });
    setFormErrors({});
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setFormLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, formData);
        setSuccess('Article updated successfully!');
      } else {
        await createArticle(formData);
        setSuccess('Article created successfully!');
      }
      
      setShowForm(false);
      setFormData({ title: '', content: '', tags: '' });
      setEditingArticle(null);
      await fetchArticles();
    } catch (err) {
      if (err.response?.data) {
        setFormErrors(err.response.data);
      } else {
        setError('Failed to save article');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await deleteArticle(id);
      setSuccess('Article deleted successfully!');
      await fetchArticles();
    } catch (err) {
      setError('Failed to delete article');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormData({ title: '', content: '', tags: '' });
    setEditingArticle(null);
    setFormErrors({});
  };

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="page-title">Admin - Manage Articles</h1>
          {!showForm && (
            <Button onClick={handleCreate}>Create New Article</Button>
          )}
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      {showForm && (
        <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2>{editingArticle ? 'Edit Article' : 'Create New Article'}</h2>
          
          <form onSubmit={handleFormSubmit}>
            <TextInput
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              error={formErrors.title?.[0]}
              required
              disabled={formLoading}
            />

            <div className="form-group">
              <label className="form-label">
                Content <span style={{ color: 'var(--error-red)' }}>*</span>
              </label>
              <textarea
                name="content"
                className={`form-textarea ${formErrors.content ? 'error' : ''}`}
                value={formData.content}
                onChange={handleFormChange}
                required
                disabled={formLoading}
                rows="10"
              />
              {formErrors.content && <div className="form-error">{formErrors.content[0]}</div>}
            </div>

            <TextInput
              label="Tags (comma-separated)"
              name="tags"
              value={formData.tags}
              onChange={handleFormChange}
              error={formErrors.tags?.[0]}
              disabled={formLoading}
              placeholder="e.g. technology, programming, tutorial"
            />

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <Button type="submit" disabled={formLoading}>
                {formLoading ? 'Saving...' : editingArticle ? 'Update Article' : 'Create Article'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancelForm} disabled={formLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

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
            <div key={article.id} className="card">
              <ArticleCard article={article} />
              <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)' }}>
                <Button onClick={() => handleEdit(article)} variant="secondary" size="sm">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(article.id)} variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            </div>
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

export default AdminArticles;
