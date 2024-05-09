import { useEffect, useState } from "react";
import "./Register.scss";
import axios from "axios";
import GenderInput from "../../inputs/GenderInput";
import DateInput from "../../inputs/DateInput";
import CitySelect from "../../inputs/CitySelect";
import StateSelect from "../../inputs/StateSelect";
import CountrySelect from "../../inputs/CountrySelect";
import AlphabetInput from "../../inputs/AlphabetInput";
import EmailInput from "../../inputs/EmailInput";
const Register = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [states, setStates] = useState([]);
  const [state, setState] = useState({});
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    age: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onChangeDobHanlder = (e, age) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value, age };
    });
  };

  const loadCountries = () => {
    const config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY":
          "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
      },
    };

    axios(config).then(function (response) {
      setCountries(response.data);
    });
  };

  const onChangeCountryHandler = (e) => {
    const { value } = e.target;
    const country = countries.find((country) => country.iso2 === value);
    setCountry((prev) => ({ ...prev, ...country }));
    setStates([]);
    setState({});
    setCities([]);
    setCity({});
    loadStates(value);
  };

  const loadStates = (iso2) => {
    const config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${iso2}/states`,
      headers: {
        "X-CSCAPI-KEY":
          "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
      },
    };

    axios(config).then(function (response) {
      setStates(response.data);
    });
  };

  const onChangeStateHandler = (e) => {
    const { value } = e.target;
    const state = states.find((state) => state.iso2 === value);
    setState((prev) => ({ ...prev, ...state }));
    setCities([]);
    setCity({});
    loadCities(value);
  };

  const loadCities = (iso2) => {
    const config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${country.iso2}/states/${iso2}/cities`,
      headers: {
        "X-CSCAPI-KEY":
          "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
      },
    };

    axios(config).then(function (response) {
      setCities(response.data);
    });
  };

  const onChangeCityHandler = (e) => {
    const { value } = e.target;
    const city = cities.find((city) => city.id === Number(value));
    setCity((prev) => ({ ...prev, ...city }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(country);
    console.log(state);
    console.log(city);  
  };

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <div className="register">
      <form onSubmit={onSubmitHandler}>
        <div className="left">
          <AlphabetInput
            label="First Name"
            name="firstName"
            placeholder="sushant"
            value={formData?.firstName}
            onChange={onChangeHandler}
          />
          <GenderInput onChange={onChangeHandler} value={formData?.gender} />
          <DateInput
            label="Date Of Birth"
            name="dob"
            type="date"
            value={formData?.dob}
            onChange={onChangeDobHanlder}
          />
          <StateSelect
            states={states}
            onChange={onChangeStateHandler}
            value={state.iso2 || ""}
            countyIso2={country.iso2}
          />
          <button type="submit">Submit</button>
        </div>
        <div className="right">
          <AlphabetInput
            label="Last Name"
            name="lastName"
            placeholder="singh"
            value={formData.lastName}
            onChange={onChangeHandler}
          />
          <EmailInput
            label="Email"
            name="email"
            placeholder="example123@gmail.com"
            value={formData?.email}
            onChange={onChangeHandler}
          />
          <CountrySelect
            countries={countries}
            onChange={onChangeCountryHandler}
            value={country.iso2 || ""}
          />
          <CitySelect
            cities={cities}
            onChange={onChangeCityHandler}
            value={city.id || ""}
            countyIso2={country.iso2}
            stateIso2={state.iso2}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
