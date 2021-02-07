"use strict";
const express = require("express");
const DB = require("./db");
const app = express();

app.use(express.json());

console.log("Server Started")

app.post("/API/users/create", (req, res) => {
  const request = req.body;
  DB.createUser(request.uid, res);
});

// Listening to APIs
app.listen(process.env.PORT || 8000, () =>
	console.log("Listening on Port 8000")
)