const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connection = mysql.createConnection(process.env.NEXT_PUBLIC_DATABASE_URL);
connection.connect();

app.use("/save", async (req, res) => {
  try {
    const {
      city,
      state,
      countryCode,
      humidity,
      pressure,
      sunrise,
      sunset,
      temerature,
      weatherDesc,
      windSpeed,
    } = req.body || {};
    connection.query(
      `INSERT INTO WeatherData (city, countryCode, state, temperature,humidity, pressure, sunrise, sunset, windSpeed, weatherDesc) 
      VALUES ("${city}", "${countryCode}", "${state}", ${temerature}, ${humidity}, ${pressure}, "${sunrise}", "${sunset}", ${windSpeed}, "${weatherDesc}");`,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results }).status(200);
      }
    );
  } catch (error) {
    res.send(error);
  }
});

app.use("/find", async (req, res) => {
  console.log("query", req.query);
  try {
    connection.query(
      `SELECT * FROM WeatherData WHERE city = "${req.query.city}"`,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results }).status(200);
      }
    );
  } catch (error) {
    res.send(error);
  }
});

// connection.end();
app.listen(3001, () => console.log("Server Running..."));
