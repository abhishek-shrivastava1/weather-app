const express = require("express");
const app = express();
const port = 3000;
const https = require('https');

app.listen(3000, () => console.log(`server is started on port ${port}`));

app.get("/", (req, res) => {
    const weatherStatusUrl = "https://api.openweathermap.org/data/2.5/weather?q=pune&appid=a4611cd157d104eb7da558986ffe7c3d&units=metric";
    https.get(weatherStatusUrl, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const tempDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            res.write(`<h1>The temperature in Pune is ${temp}.</h1>`);
            res.write(`<p>the weather is ${tempDescription}</p>`);
            res.write(`<img src= "http://openweathermap.org/img/wn/${icon}@2x.png">`);
            res.send();
        });
    });
    // res.send("The server is up and running.");
})