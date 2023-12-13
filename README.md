## STEPS to start project 

1) Run npm install in root directory.
2) Run npm install inside /backend directory.
3) Add one .env in root directory for frontend.
4) Add another .env for API in /backend directory.
5) Now, Run node index.js inside /backend directory to run node API server.  
6) Now, Run npm run dev in root directory to start NextJs frontend.

# Stack & Technologiee Used -> 
- Created this project using **NextJs-14** coupled with (App Router) as instructed.
- Using **Open Weather Map free APIs** for fetching Co-Ordinates(Lat & Lon) for user mentioned city & for fetching weather information as well using coordinates.
- Using **PlanetScale (MySql)** free database for storing the weather information fetched from users.
- Also, using **mysql2** npm package to create a mysql connection for interacting with database using express server.

### About Weather App ->

This is a cool application which takes a city name from user and user can also specify the country code where this city exists, for even more accurate results. Then it fetches the recent weather information of that city and shows breif information on the screen also simultaneously It saves the user fetched data on MySQL database as well. 
User can also go back to the previous screen whenever they want to fetch the another city detail.
In case you entered wrong city name of server doesn't responded well, User gets a error message on screen like (Something went wrong...).
