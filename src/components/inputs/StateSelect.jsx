const StateSelect = ({ states, onChange, value, countyIso2 }) => {
  return (
    <>
      <label htmlFor="state">State</label>
      <select
        id="state"
        name="state"
        onChange={onChange}
        value={value}
        disabled={!countyIso2}
      >
        <option value="" disabled>
          -- Select State --
        </option>
        {states.map((state) => (
          <option key={state.id} value={state.iso2}>
            {state.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default StateSelect;
