const express = require('express'),
http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter'); //File base node module

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //using development version
app.use(bodyParser.json());

app.use('/dishes', dishRouter); //Mounting the router

//This tells Express to serve up the static files from __dirname.
app.use(express.static(__dirname + '/public'));  

app.use((req, res, next) => {
  //now no need to explicity log with consol.log, morgan will log suffieicnt los
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});