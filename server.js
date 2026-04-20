const express = require("express");
const app = express();

app.use(express.json());
const requestRoute = require("./routes/request");

app.use("/request", requestRoute);
//Global Error hanlding
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server Error" });
});
const PORT = 3000; //Taken form ENv
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
