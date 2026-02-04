import { useState, useEffect } from 'react';
import { getArticles } from '../api/endpoints';

const TestConnection = () => {
  const [status, setStatus] = useState('Testing...');
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('🧪 Testing connection to API...');
      const response = await getArticles({ page_size: 3 });
      console.log('✅ API Response:', response.data);
      
      setArticles(response.data.results || []);
      setStatus('✅ Connected!');
    } catch (err) {
      console.error('❌ Connection failed:', err);
      setError(err.message);
      setStatus('❌ Failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Connection Test</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Status: {status}</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Environment Check:</h3>
        <p>API URL: {import.meta.env.VITE_API_BASE_URL || 'Not set!'}</p>
        <p>Mode: {import.meta.env.MODE}</p>
        <p>Dev: {import.meta.env.DEV ? 'Yes' : 'No'}</p>
      </div>

      {articles.length > 0 && (
        <div>
          <h3>Articles Loaded ({articles.length}):</h3>
          <ul>
            {articles.map(article => (
              <li key={article.id}>
                {article.title} by {article.author_username}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={testConnection} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Test Again
      </button>
    </div>
  );
};

export default TestConnection;
