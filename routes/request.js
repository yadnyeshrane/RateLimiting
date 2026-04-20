const express = require("express");
const router = express.Router();
const middleware = require("../middleware/ratelimiter");

router.post("/", middleware, (req, res) => {
    const { user_id, payload } = req.body;
    res.status(200).json({
        message: "Request accepted",
        user_id,
        payload,
    });
});

module.exports = router;
