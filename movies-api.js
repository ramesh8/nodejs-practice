const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mflix");
const db = mongoose.connection;
const app = express();

app.use(express.json());

//CRUD
//CREATE, READ, UPDATE, DELETE

//Read

app.get("/api/movies", async (req, res) => {
  //get movies from mongodb and return movies
  let movies = await db.collection("movies").findOne();
  console.log(movies);
  res.json(movies);
});

app.post("/api/movies", async (req, res) => {
  let movie = req.body;
  console.log(movie);
  let status = await db.collection("movies").insertOne(movie);
  res.json(status);
});

app.delete("/api/movies/:name", async (req, res) => {
  let name = req.params.name;
  let status = await db.collection("movies").deleteOne({ name: name });
  res.json(status);
});

app.put("/api/movies/:name", async (req, res) => {
  let name = req.params.name;
  let movie = req.body;
  let status = await db
    .collection("movies")
    .updateOne({ name: name }, { $set: { plot: movie.plot } });
  res.json(status);
});

app.listen(5000, () => console.log("Running on port 5000..."));
