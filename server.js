var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var app = express();

var results = [];

request("https://www.nytimes.com", function(error, response, html) {

  var $ = cheerio.load(html);

  $("article.theme-summary").each(function(i, element) {
    var titleElement = $(element).find(".story-heading").children();
    var title = titleElement.text();
    var link = titleElement.attr("href");
    var summary = $(element).find(".summary").text();

    // validate element has all material
    if (title && link && summary) {
      results.push({
        title: title,
        link: link,
        summary: summary
      });
    };
  });

  // console.log(results);
});

// routes
app.get('/data', function(request, response) {
  response.json(results);
});

app.listen(3007, function() {
  console.log('listening on port 3007.')
})
