# 🚀 Rate-Limited API in Node.js

## 📌 Overview
This project implements a simple **Node.js/Express API** with:
- `POST /request` → Accepts `{ user_id, payload }`
- `GET /stats` → Returns per-user request statistics
- **Rate limiting** → Maximum **5 requests per user per minute**
- **In-memory storage** → No database required

The system is designed to handle concurrent requests correctly in a single Node.js process.  
For production, you should use a centralized store (e.g., Redis) to ensure accuracy across multiple servers.

---

## 📂 Project Structure

project/
├── server.js          # Entry point
├── routes/
│   ├── request.js     # POST /request route
│   └── stats.js       # GET /stats route
├── middleware/
│   └── rateLimiter.js # Rate limiting logic
├── services/
│   └── statsService.js# Stats handling logic


---

## ⚙️ Installation & Setup

 1. Clone the repository

git clone https://github.com/your-username/rate-limited-api.git
cd rate-limited-api

2. Install dependencies
    npm install
3.Start the server
   node server.js

   
##### API Endpoints
 ----- >  POST /request
Accepts a JSON body:

json
{
  "user_id": "alice",
  "payload": "hello world"
}
✅ Success Response:

json
{
  "message": "Request accepted",
  "user_id": "alice",
  "payload": "hello world"
}
❌ Error (rate limit exceeded):

json
{
  "error": "Rate limit exceeded. Max 5 requests per minute."
}   
-------> GET /stats
Returns per-user request statistics:

json
{
  "alice": { "totalRequests": 3 },
  "bob": { "totalRequests": 1 }
}


######## Rate Limiting Logic
Each user’s request timestamps are tracked in memory.

On each request:

Old timestamps (older than 1 minute) are discarded.

If 5 requests already exist in the last minute, a 429 Too Many Requests error is returned.

Stats are updated atomically per request.

#### Production Points to be consider
1)For multiple processes/servers, use Nats or another centralized store for mianting the counter of rate limiting.
2)Stats reset when the server restarts. Use a database if long-term tracking is required.
3) Ensure user_id and payload are properly validated and sanitized to prevent injection attacks.
4)Userid should be taken from bearer token instead of taking inside the requestbody.
5)Single process limitation: In-memory maps work only within one Node.js process. If you run multiple processes ( Kubernetes pods), each instance will track its own counters → rate limiting becomes inaccurate.
6)Monitoring: Add logging and metrics (e.g., Prometheus, Grafana) to monitor request rates, errors, and rate-limit hits.


✅ Example Usage

# Successful request
curl -X POST http://localhost:3000/request \
  -H "Content-Type: application/json" \
  -d '{"user_id":"alice","payload":"hello"}'

# View stats
curl http://localhost:3000/stats

## After 5 requests within a minute for the same user_id, the 6th will return:

{ "error": "Rate limit exceeded. Max 5 requests per minute." }
