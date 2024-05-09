const CitySelect = ({ cities, onChange, value, countyIso2, stateIso2 }) => {
  return (
    <>
      <label htmlFor="city">City</label>
      <select
        id="city"
        name="City"
        onChange={onChange}
        value={value}
        disabled={!countyIso2 || !stateIso2}
      >
        <option value="" disabled>
          -- Select City --
        </option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CitySelect;
