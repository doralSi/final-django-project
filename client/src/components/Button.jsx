const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'normal', 
  block = false,
  type = 'button',
  disabled = false,
  onClick,
  className = ''
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const blockClass = block ? 'btn-block' : '';
  
  const classes = [baseClass, variantClass, sizeClass, blockClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
