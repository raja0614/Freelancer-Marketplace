export default function FormField({ label, error, id, as: Input = 'input', children, className = '', ...inputProps }) {
  const fieldId = id || inputProps.name;
  const inputClassName = `input${error ? ' input-error' : ''}${className ? ` ${className}` : ''}`;
  return <div className="form-field">
    <label htmlFor={fieldId}>{label}</label>
    <Input {...inputProps} id={fieldId} className={inputClassName} aria-invalid={Boolean(error)}>
      {children}
    </Input>
    {error && <span className="input-error-message">{error}</span>}
  </div>;
}
