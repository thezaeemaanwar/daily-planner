"use strict";
const express = require("express");
const DB = require("./db");
const app = express();

app.use(express.json());

console.log("Hi this is server")
app.post("/API/users/create", (req, res) => {
  const uid = req.body;
  console.log("server uid : ", uid)
  DB.createUser(uid, res);
});

// Listening to APIs
app.listen(process.env.PORT || 8000, () =>
	console.log("Listening on Port 8000")
)