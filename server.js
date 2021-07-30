const express = require("express");
const logger = require("./src/config/config").logger;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.all("*", (req, res, next) => {
  const method = req.method;
  logger.debug("Method: ", method);
  next();
});

// Catch-all route
app.all("*", (req, res, next) => {
  logger.warn("Catch-all endpoint aangeroepen");
  next({
    message: req.method + " endpoint '" + req.url + "' does not exist",
    errCode: 401,
  });
});

// Errorhandler
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.errCode || 500).json({
    error: err.error || "Some error occurred",
    message: err.message,
  });
});

app.listen(port, () => {
  logger.info(`Server listening at port ${port}`);
  logger.info(`Server running in '${process.env.NODE_ENV}' mode`);
});

module.exports = app;
