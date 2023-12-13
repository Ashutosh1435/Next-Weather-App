import React from "react";
import styles from "../../app/page.module.css";

interface Props {
  showError: boolean;
  city: string;
  countryCode: string;
  setcity: Function;
  setCountryCode: Function;
  fetchCityWeather: () => void;
}
const Form: React.FC<Props> = ({
  showError,
  city,
  countryCode,
  setcity,
  setCountryCode,
  fetchCityWeather,
}) => {
  return (
    <div className={styles.container}>
      <>
        <input
          value={city}
          placeholder="Enter city name (Required)"
          className={styles.input}
          onChange={(e) => setcity(e.target.value)}
        />
        <input
          value={countryCode}
          placeholder="Enter country code (Optional)"
          className={styles.input}
          onChange={(e) => setCountryCode(e.target.value)}
        />
      </>
      {showError && (
        <p className={styles.error}>
          {
            "Something went wrong. Either you misspelled the detail or server not responded"
          }
        </p>
      )}
      <button
        disabled={!city}
        onClick={fetchCityWeather}
        className={styles.btn}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
