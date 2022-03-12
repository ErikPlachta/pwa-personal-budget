const express = require("express");
const logger = require("morgan");
const { mongoose } = require('./config/connection');
const compression = require("compression");

const PORT = process.env.PORT || 3001;

const app = express();

//-- prints details to log of what's happening
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use(require("./routes/"));

app.listen(PORT, () => console.log(`Now listening on http://127.0.0.1:${PORT}`));