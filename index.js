const express = require("express");

const api = require("./routes/api");

// express app init
const app = express();

// application/json parser
app.use(express.json());

app.use("/api", api);

// listen at 8080
app.listen(8000);
