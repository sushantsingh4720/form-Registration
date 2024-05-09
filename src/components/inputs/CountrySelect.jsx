const CountrySelect = ({ countries, onChange, value }) => {
  return (
    <>
      <label htmlFor="country">Country</label>
      <select id="country" name="country" onChange={onChange} value={value}>
        <option value="" disabled>
          -- Select Country --
        </option>
        {countries.map((country) => (
          <option key={country.id} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CountrySelect;
