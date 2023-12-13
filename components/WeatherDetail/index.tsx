import React from "react";
import styles from "../../app/page.module.css";
import { ICoOrdinatesType, IWeatherDetail } from "@/interfaces";
import { getFormattedDate } from "@/utils";

interface Props {
  handleGoBack: () => void;
  coordinates: ICoOrdinatesType;
  weatherDetail: IWeatherDetail | null;
}
const WeatherDetail: React.FC<Props> = ({
  handleGoBack,
  coordinates,
  weatherDetail,
}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default WeatherDetail;
