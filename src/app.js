const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home - Weather App",
    name: "Home",
    author: "Danish Mobin",
    contentText: "Use this site to get your weather!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About - Weather App",
    name: "About",
    author: "Danish Mobin",
    contentText: "This is the about page!",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help - Weather App",
    name: "Help",
    author: "Danish Mobin",
    contentText: "This is the help page!",
  });
});

/*
// app.com
app.get("", (req, res) => {
  res.send(`<h1>Weather</h1>`);
});

// app.com/help
app.get("/help", (req, res) => {
  res.send([
    {
      name: "danish",
      age: 35,
    },
    {
      name: "tabish",
      age: 38,
    },
  ]);
});

// app.com/about
app.get("/about", (req, res) => {
  res.send(`<h3>About page</h3>`);
});

*/

//app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  const address = req.query.address;
  geocode.geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast.forecast(latitude, longitude, (error, forecast = 'No forecast') => {
      if (error) {
        return res.send({ error });
      }

      res.send({ forecast, location, address });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query.search),
    res.send({
      products: [],
    });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "404: Help article not found.",
    author: "Danish Mobin",
    contentText: "This is the /help/404 page!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "404: Page not found.",
    author: "Danish Mobin",
    contentText: "This is the 404 page!",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
