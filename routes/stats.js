const express = require("express");
const { getStats } = require("../services/statservice");
const router = express.Router();
router.get("/", (req, res) => {
    res.json(getStats());
});
module.exports = router;
