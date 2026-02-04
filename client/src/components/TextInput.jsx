const TextInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error,
  placeholder = '',
  required = false,
  disabled = false
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span style={{ color: 'var(--error-red)' }}> *</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default TextInput;
