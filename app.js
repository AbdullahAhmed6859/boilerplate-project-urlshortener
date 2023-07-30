const path = require("path");
const express = require("express");
const cors = require("cors");
const Url = require("./urlModel");
const Counter = require("./counterModel");
const isHttpUrl = require("is-http-url");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", function (req, res) {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.status(200).json({ greeting: "hello API" });
});

app.post("/api/shorturl", async function (req, res) {
  let url = req.body.url.endsWith("/")
    ? req.body.url.slice(0, -1)
    : req.body.url;

  if (isHttpUrl(url)) {
    let urlDoc = await Url.findOne({ original_url: url });
    if (!urlDoc) urlDoc = await Url.create({ original_url: url });

    let short_url = urlDoc.short_url;

    res.status(200).json({
      status: "success",
      original_url: url,
      short_url,
    });
  } else {
    res.status(200).json({
      status: "failed",
      error: "Invalid URL",
    });
  }
});

app.get("/api/shorturl/:short_url", async (req, res) => {
  const urlDoc = await Url.findOne({ short_url: req.params.short_url });
  if (urlDoc) {
    res.redirect(urlDoc.original_url);
  } else {
    res.status(404);
  }
});

module.exports = app;
