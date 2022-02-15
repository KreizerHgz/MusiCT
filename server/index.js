const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'musict'
});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3001, () => {
    console.log("All good!");
});