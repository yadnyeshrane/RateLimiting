const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables
app.use(express.json());
const requestRoute = require("./routes/request");

app.use("/request", requestRoute);
//Global Error hanlding
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server Error" });
});
const PORT = process.env.PORT || 3000; //Taken form ENv
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
