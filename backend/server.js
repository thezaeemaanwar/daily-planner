"use strict";
const express = require("express");
const DB = require("./db");
const app = express();

app.use(express.json());

app.post("/API/users/create", (req, res) => {
  const request = req.body;
  DB.createUser(request.uid, res);
});

app.post('/API/data', (req, res)=>{
  const reqBody =  req.body
  DB.getData(reqBody, res)
})

app.post('/API/data/send', (req, res)=>{
  const request = req.body
  DB.updateData(request, res);
})

// Listening to APIs
app.listen(process.env.PORT || 8001, () =>
	console.log("Listening on Port 8001")
)