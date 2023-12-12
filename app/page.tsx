"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getFormattedDate } from "@/utils";
// import { dbCall } from "@/utils/db";

interface ICoOrdinatesType {
  lat: number;
  lon: number;
  country: string;
  state: string;
  city: string;
}
interface IWeatherDetail {
  temp: number /* Degree Celsius */;
  humidity: number /* % */;
  pressure: number /* hPa */;
  sunRise: Date /* time */;
  sunSet: Date /* time */;
  windSpeed: number /* m/sec */;
  weatherDes: string;
}
export default function Home() {
  const defaultCoordinates = {
    lat: 0,
    lon: 0,
    country: "",
    state: "",
    city: "",
  };
  const [city, setcity] = useState<string>("Delhi");
  const [countryCode, setCountryCode] = useState<string>("In");
  const [showForm, setShowForm] = useState<boolean>(true);
  const [coordinates, setCoordinates] =
    useState<ICoOrdinatesType>(defaultCoordinates);
  const [weatherDetail, setWeatherDetail] = useState<IWeatherDetail | null>(
    null
  );
  const [showError, setShowError] = useState<boolean>(false);
  // function to fetch weather information
  useEffect(() => {
    if (coordinates.lat) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_MAP_API_KEY}`
      )
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((data) => {
          setWeatherDetail({
            temp: data.main.temp,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            sunRise: new Date(data.sys.sunrise * 1000),
            sunSet: new Date(data.sys.sunset * 1000),
            windSpeed: data.wind.speed,
            weatherDes: data.weather[0]?.description,
          });
          setShowForm(false);
          setcity("");
          setCountryCode("");
        })
        .catch((err) => {
          setShowError(true);
        });
    }
  }, [coordinates.lat]);
  // save data on mysql db
  useEffect(() => {
    if (weatherDetail?.humidity) {
      handleSaveData();
    }
  }, [weatherDetail]);
  const fetchCityWeather = () => {
    if (showError) setShowError(false);
    const add = `${city}, ${countryCode}`;
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${add}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_MAP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setCoordinates({
          lat: data[0].lat.toFixed(2) as number,
          lon: data[0].lon.toFixed(2) as number,
          state: data[0].state,
          country: data[0].country,
          city: city || "",
        });
      })
      .catch((err) => {
        setShowError(true);
      });
  };
  const handleGoBack = () => {
    setShowForm(true);
    setCoordinates(defaultCoordinates);
    setWeatherDetail(null);
  };

  const handleSaveData = async () => {
    const data = {
      city: coordinates.city,
      state: coordinates.state,
      countryCode: coordinates.country,
      humidity: weatherDetail?.humidity,
      pressure: weatherDetail?.pressure,
      sunrise: weatherDetail?.sunRise,
      sunset: weatherDetail?.sunSet,
      temerature: weatherDetail?.temp,
      weatherDesc: weatherDetail?.weatherDes,
      windSpeed: weatherDetail?.windSpeed,
    };
    fetch("http://localhost:3001/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log("Success : ", data))
      .catch((err) => console.error("Error : ", err));
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Weather APP</h1>
      <p className={styles.sub_heading}>
        Introducing a sleek weather information application – simply input
        the&nbsp;
        <b>city name</b> and &nbsp;
        <b>country code</b>, and instantly receive a concise weather report for
        your specified location.
      </p>
      {showForm ? (
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
      ) : (
        <>
          <h4 onClick={handleGoBack} className={styles.back_link}>
            Check for another city
          </h4>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.row}>
                <p>City Name - </p>
                <span>{coordinates.city}</span>
              </div>
              <div className={styles.row}>
                <p>State Name - </p>
                <span>{coordinates.state}</span>
              </div>
              <div className={styles.row}>
                <p>Country Name - </p>
                <span>{coordinates.country}</span>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.row}>
                <p>Temperature - </p>
                <span>{weatherDetail?.temp + " °C"}</span>
              </div>
              <div className={styles.row}>
                <p>Humidity - </p>
                <span>{weatherDetail?.humidity + " %"}</span>
              </div>
              <div className={styles.row}>
                <p>Pressure - </p>
                <span>{weatherDetail?.pressure + " hPA"}</span>
              </div>
              <div className={styles.row}>
                <p>Sunrise - </p>
                <span>{getFormattedDate(weatherDetail?.sunRise as Date)}</span>
              </div>
              <div className={styles.row}>
                <p>Sunset - </p>
                <span>{getFormattedDate(weatherDetail?.sunSet as Date)}</span>
              </div>
              <div className={styles.row}>
                <p>Wind Speed - </p>
                <span>{weatherDetail?.windSpeed + " meter/sec"}</span>
              </div>
              <div className={styles.row}>
                <p>Weather Description - </p>
                <span>{weatherDetail?.weatherDes}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
