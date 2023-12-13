export interface ICoOrdinatesType {
  lat: number;
  lon: number;
  country: string;
  state: string;
  city: string;
}
export interface IWeatherDetail {
  temp: number /* Degree Celsius */;
  humidity: number /* % */;
  pressure: number /* hPa */;
  sunRise: Date /* time */;
  sunSet: Date /* time */;
  windSpeed: number /* m/sec */;
  weatherDes: string;
}
