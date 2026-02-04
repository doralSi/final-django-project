import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/endpoints';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Register</h1>
      </div>

      {errors.general && <Alert type="error" message={errors.general} onClose={() => setErrors({})} />}
      {success && <Alert type="success" message="Registration successful! Redirecting to login..." />}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username?.[0]}
            required
            disabled={loading || success}
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email?.[0]}
            required
            disabled={loading || success}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password?.[0]}
            required
            disabled={loading || success}
          />

          <Button type="submit" block disabled={loading || success}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
