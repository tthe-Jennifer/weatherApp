// const { log } = require("console");
const express = require("express");
const https = require("https");
const {dirname} = require("path");
const bodyParser = require("body-parser"); // catching input

const app = express();

app.use(bodyParser.urlencoded({extended: true})); // catching input

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
})

// using app.post to catch the data, cityName posted in html form

app.post("/", function (req, res) {
    console.log(req.body.cityName);

    const query = req.body.cityName; //catching input
    const apiKey = "e5604f1af448e04858452ef3c3e9d46b";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function (response) {
        console.log("Status code is " + response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(temp);
            console.log(description);

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
            res.write("<p> " + query + " is currently " + description + "</p>");
            res.write("<img src='" + imageUrl + "'/>");
            res.send();
        });
    });

})


app.listen(3000, function () {
    console.log("server is running on port 3000");
});
