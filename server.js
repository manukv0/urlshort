const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const validUrl = require("valid-url");  // To check if the URL is valid
const { nanoid } = require("nanoid"); // To generate short URL

app.use(bodyParser.json()); // For parsing JSON

app.post("/shorten-url", (req, res) => {
  const longUrl = req.body.longUrl;

  if (validUrl.isUri(longUrl)) {
    const shortUrl = nanoid(6); // Generate a 6-character shortened URL
    // Save this in your database (optional), or in-memory for testing
    console.log(`Shortened URL: ${shortUrl}`);

    res.json({
      success: true,
      shortenedUrl: http://localhost:3000/${shortUrl},
    });
  } else {
    res.json({
      success: false,
      message: "Invalid URL",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});