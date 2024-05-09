import { useState } from "react";

const AlphabetInput = ({ label, name, value, placeholder, onChange }) => {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.trim() === "" || /^[A-Za-z]+$/.test(value)) {
      onChange(e);
      setError("");
    } else {
      setError("Please enter alphabets only");
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
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

export default AlphabetInput;
