const {
  handleHomePage,
  handleStatic,
  handleResultsPage,
  handleApi
} = require("./handler");

const router = (req, res) => {
  const url = req.url;
  if (url === "/") {
    handleHomePage(req, res);
  } else if (url.indexOf("public") != -1) {
    handleStatic(req, res);
  } else if (url.indexOf("results") != -1) {
    handleResultsPage(req, res);
  } else if (url.indexOf("api") != -1) {
    handleApi(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`<h1> Sorry, your request wasn't found. </h1>`);
  }
};

module.exports = router;
