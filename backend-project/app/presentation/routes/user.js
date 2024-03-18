const express = require("express");
const router = express.Router();

router.get("/:user_id", function (req, res, next) {
  console.info(req);
  res.send(`You are user ${req.params["user_id"]}`);
});

module.exports = router;
