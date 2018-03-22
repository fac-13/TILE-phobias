const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const data = require("./data.json");

const handleHomePage = (req, res) => {
  console.log("req:" + req);
  const url = req.url;
  const pathName = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(pathName, (err, file) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1> Sorry! There was an error. </h1>`);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    }
  });
};

const handleStatic = (req, res) => {
  const url = req.url;
  const extensions = {
    html: "text/html",
    js: "application/javascript",
    css: "text/css",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpg",
    ico: "image/x-icon"
  };
  const extensionType = url.split(".")[1];
  const pathName = path.join(__dirname, "..", url); //url is defined by the path set in index.html
  fs.readFile(pathName, (err, file) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1> Sorry! There was an error. </h1>`);
    } else {
      res.writeHead(200, { "Content-Type": `${extensions[extensionType]}` });
      res.end(file);
    }
  });
};

const handleResultsPage = (req, res) => {
  const url = req.url;
  const pathName = path.join(__dirname, "..", "public", "results.html");
  fs.readFile(pathName, (err, file) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1> Sorry! There was an error. </h1>`);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    }
  });
};

const handleApi = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const url = req.url;
  console.log(url);
  const split = url.split("/");
  const letter = split[split.length - 1];
  console.log(letter);
  const dataObj = JSON.parse(JSON.stringify(data));

  const keys = Object.keys(dataObj);
  const filtered = keys.filter(key => key.startsWith(letter));
  const returnVals = {};
  filtered.forEach(val => (returnVals[val] = dataObj[val]));

  console.log(returnVals);
  res.end(JSON.stringify(returnVals));
};

module.exports = {
  handleHomePage,
  handleStatic,
  handleResultsPage,
  handleApi
};
