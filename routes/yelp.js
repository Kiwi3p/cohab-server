const express = require("express");
const yelp = require("yelp-fusion");
const router = express.Router();
const path = require("path");

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey =
`${process.env.YELP_API}`;

//const app = express();

// app.set("view engine", "hbs");
// app.set("views", __dirname + "/views");
// app.use(express.static(__dirname + "/public"));

const searchRequest = {
  term: "Romantic",
  location: "Lisbon, pt",
  //latitude: 38.7600325,   //input {{LAT}} data here
  //longitude: -9.1400807, //input {{LONG}} data here
  radius: 5000,
  limit: 8,
};

/*
let listOfSupermarketsFromAPI = [];

let filteredSupermarkets = listOfSupermarketsFromAPI.filter((supermarket) => {
  return supermarket.name !== 'pingo doce' || 
}) */

const client = yelp.client(apiKey);

router.get("/yelp", (req, res) => {
  client
    .search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses;
      //  const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(firstResult);
      res.json( firstResult );
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
