import { useState, useEffect } from "react";

const EmailInput = ({ label, name, value, placeholder, onChange }) => {
  const [error, setError] = useState("");

  useEffect(() => {}, [value]);

  const isValidEmail = (email) => {
    // Simplified email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e) => {
    onChange(e);
    const { value } = e.target;
    if (!isValidEmail(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="email"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default EmailInput;
