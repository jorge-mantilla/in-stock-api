const express = require('express');
const app = express();
const knex = require("knex")(require("./knexfile"));
// make sure you're .env PORT value is in the .gitignore file
const PORT = process.env.PORT || 5051;
const cors = require('cors');
require('dotenv').config()
// const {CORS_ORIGIN} = process.env;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});