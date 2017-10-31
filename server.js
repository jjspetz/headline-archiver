const cheerio = require('cheerio');
const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// return of articles
var results = {
  headlines: [],
  archived: []
};

// gets the headlines by scrapping new york times
request("https://www.nytimes.com", function(error, response, html) {

  var $ = cheerio.load(html);

  $("article.theme-summary").each(function(i, element) {
    var titleElement = $(element).find(".story-heading").children();
    var title = titleElement.text();
    var link = titleElement.attr("href");
    var summary = $(element).find(".summary").text();

    // validate element has all material
    if (title && link && summary) {
      results.headlines.push({
        title: title,
        link: link,
        summary: summary
      });
    };
  });

  // console.log(results);
});

// mongodb set up
MongoClient.connect("mongodb://localhost:27017/articles", function(err, db) {
  if (err) throw err;

  // post routes
  app.post('/archive/:article', jsonParser, function(request, response) {
    console.log(request.params.article, request.body)
    // needs validation (if query empy insert)
    db.collection("archived").insertOne(request.body, function(err, res) {
      if (err) throw err;
      // console.log("inserted");
    });
  });

  // set up archived articles
  db.collection("archived").find().toArray(function(err, dbResult) {
    if (err) throw err;
    // console.log(dbResult)
    results.archived = dbResult;
  });

});

// routes
app.get('/data', function(request, response) {
  response.json(results);
});

app.listen(3007, function() {
  console.log('listening on port 3007.')
})
