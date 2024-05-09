import { useState, useEffect } from "react";

const DateInput = ({ label, name, value, placeholder, onChange }) => {
  const [error, setError] = useState("");

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const age = calculateAge(value);

    if (age < 14 || age >= 99) {
      setError("Age must be between 14 and 98 years");
    } else {
      setError("");
      onChange(e, age);
    }
  };
  // Calculate min and max dates based on age requirements
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 14,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const minDate = new Date(
    today.getFullYear() - 99,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  return (
    <>
      <label htmlFor={name}>
        {label}{" "}
        <span style={{ fontSize: ".8rem" }}>
          (Age must be between 14 and 98 years)
        </span>
      </label>
      <input
        type="date"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        min={minDate}
        max={maxDate}
        onChange={handleInputChange}
      />
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default DateInput;
