const { stats } = require("../middleware/ratelimiter");

// Convert Map to plain object for JSON response
function getStats() {
    const obj = {};
    stats.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

module.exports = { getStats };
