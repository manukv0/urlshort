// Import required modules
const express = require('express');     // Express framework for routing and server creation
const bodyParser = require('body-parser');  // Body-parser to parse incoming request bodies
const shortid = require('shortid');     // shortid to generate unique short URLs
const app = express();                  // Initialize express app
const port = 3000;                      // Set the port for the server

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data (URL-encoded)

// Store the URLs
let urlDatabase = {};

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public'));

// Home route to display the form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to handle URL shortening
app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;     // Get the original URL from the form
  const shortUrl = shortid.generate();  // Generate a short URL

  // Save the original URL in the database with the short URL
  urlDatabase[shortUrl] = originalUrl;

  // Send the response with the shortened URL
  res.send(`Shortened URL is: <a href="/${shortUrl}">${req.protocol}://${req.get('host')}/${shortUrl}</a>`);
});

// Route to redirect to the original URL using the short URL
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  // Check if the short URL exists in the database
  if (urlDatabase[shortUrl]) {
    // Redirect to the original URL
    res.redirect(urlDatabase[shortUrl]);
  } else {
    // If short URL not found, send a 404 error
    res.status(404).send('Short URL not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});