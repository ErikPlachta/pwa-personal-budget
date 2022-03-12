const router = require("express").Router();
const Entry = require("../models/entry.js");

router.post("/api/entry", ({body}, res) => {
  Entry.create(body)
    .then(dbEntry => {
      res.json(dbEntry);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/entry/bulk", ({body}, res) => {
  Entry.insertMany(body)
    .then(dbEntry => {
      res.json(dbEntry);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/entry", (req, res) => {
  Entry.find({}).sort({date: -1})
    .then(dbEntry => {
      res.json(dbEntry);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;