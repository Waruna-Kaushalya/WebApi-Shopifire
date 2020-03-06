// index.js
const express = require('express');
const app = express();

const home = require("./routes/home");



app.use("/",home);

app.listen(8000, () => console.log('listening on port 8000'));