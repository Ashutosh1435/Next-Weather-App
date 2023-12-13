"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Form from "@/components/Form";
import { ICoOrdinatesType, IWeatherDetail } from "@/interfaces";
import WeatherDetail from "@/components/WeatherDetail";
import Heading from "@/components/Heading";

const defaultCoordinates = {
  lat: 0,
  lon: 0,
  country: "",
  state: "",
  city: "",
};

export default function Home() {
  //  necessary state variables
  const [city, setcity] = useState<string>("Delhi");
  const [countryCode, setCountryCode] = useState<string>("In");
  const [showForm, setShowForm] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [coordinates, setCoordinates] =
    useState<ICoOrdinatesType>(defaultCoordinates);
  const [weatherDetail, setWeatherDetail] = useState<IWeatherDetail | null>(
    null
  );

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

  // func for fetching the city weather
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

  // handle press back to form
  const handleGoBack = () => {
    setShowForm(true);
    setCoordinates(defaultCoordinates);
    setWeatherDetail(null);
  };

  // function for saving the data to db
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
      {/* Main Heading */}
      <Heading />
      {showForm ? (
        <Form
          showError={showError}
          city={city}
          countryCode={countryCode}
          setcity={setcity}
          setCountryCode={setCountryCode}
          fetchCityWeather={fetchCityWeather}
        />
      ) : (
        <WeatherDetail
          handleGoBack={handleGoBack}
          coordinates={coordinates}
          weatherDetail={weatherDetail}
        />
      )}
    </main>
  );
}
