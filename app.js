const https = require('https');
const express = require('express')
const app = express()

app.get("/", function (request, res) {

  res.sendFile(__dirname + "/index.html")
  const query = "London"
  const apiKey = "7a2c0c8ca6f285d85a21f43ecc92f829"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units
  https.get(url, function (response) {
    console.log(response.statusCode)
    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const icon = weatherData.weather[0].icon
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(weatherDescription)
      res.write("<p>The weather is currently " + weatherDescription + "</p>")
      res.write("<h1> The temperature is " + temp + " degrees Celcius. </h1>")
      res.write("<img src=" + imageUrl + " />")
      res.send()
    })
  })
  // response.send("server is up and running")
})


app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
})