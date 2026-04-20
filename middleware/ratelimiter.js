const requestUserData = new Map();
const stats = new Map();

const MAX_REQUSTS = 5;
const Request_Timer = 60 * 1000; // 1 minute

function rateLimiter(request, response, next) {
    const { user_id } = request.body;
    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }
    const now = Date.now();
    let timestamps = requestUserData.get(user_id) || [];
    timestamps = timestamps.filter((ts) => now - ts < Request_Timer);
    if (timestamps.length >= MAX_REQUSTS) {
        return res.status(429).json({
            error: "Rate limit exceeded. Max 5 requests per minute.",
        });
    }
    timestamps.push(now);
    requestUserData.set(user_id, timestamps);
    const userStats = stats.get(user_id) || { totalRequest: 0 };
    userStats.totalRequest++;
    stats.set(user_id, userStats);
    next();
}

module.exports = rateLimiter;
