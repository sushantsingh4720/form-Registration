import { useState, useEffect } from "react";

const GenderInput = ({ onChange, value }) => {
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (!value) {
  //     setError("Gender is required");
  //   } else {
  //     setError("");
  //   }
  // }, [value]);

  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <>
      <label htmlFor="gender">Gender</label>
      <div className="radioinput">
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          checked={value === "Male"}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          checked={value === "Female"}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="female">Female</label>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default GenderInput;
