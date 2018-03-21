const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const router = (req, res) => {
  const url = req.url;
  console.log(url);
  if(url === '/') {
    const pathName = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(pathName, (err, file) => {
      if (err) {
        res.writeHead(500, {'Content-Type' : 'text/html'});
        res.end(`<h1> Sorry! There was an error. </h1>`);
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(file);
      }
    });
  } else if (url.indexOf('public') != -1) {
    const extensions = {
      html: 'text/html',
      js: 'application/javascript',
      css: 'text/css',
      json: 'application/json',
      png: 'image/png',
      jpg: 'image/jpg',
      ico: 'image/x-icon'
    }
    const extensionType = url.split('.')[1];
    const pathName = path.join(__dirname, "..", url); //url is defined by the path set in index.html
    fs.readFile(pathName, (err, file) => {
      if (err) {
        res.writeHead(500, {'Content-Type' : 'text/html'});
        res.end(`<h1> Sorry! There was an error. </h1>`);
      } else {
        res.writeHead(200, {'Content-Type': `${extensions[extensionType]}`});
        res.end(file);  
      }
    });
  } else if (url.indexOf('results') != -1) {
    const pathName = path.join(__dirname, '..', 'public', 'results.html');
    fs.readFile(pathName, (err, file) => {
      if (err) {
        res.writeHead(500, {'Content-Type' : 'text/html'});
        res.end(`<h1> Sorry! There was an error. </h1>`);
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(file);
      }
    });
  }  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end(`<h1> Sorry, your request wasn't found. </h1>`);
  }
}

module.exports = router;