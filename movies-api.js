const express = require("express");
const mongoose = require("mongoose");
const Movies = require("./models/movies");

mongoose.connect("mongodb://127.0.0.1:27017/mflix");
const db = mongoose.connection;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let movie = new Movies({
      title: "my movie",
      plot: "something happens",
      genres: ["Action", "Sci-Fi"],
      cast: ["Will Smith", "Harrison"],
      year: 2050,
      released: new Date(2012, 08, 10),
      awards: {
        wins: 0,
        nominations: 1,
        text: "Academy Award",
      },
    });

    let result = await movie.save();
    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

//CRUD
//CREATE, READ, UPDATE, DELETE

//Models

app.get("/api/movies", async (req, res) => {
  //get movies from mongodb and return movies
  let movies = await db.collection("movies").find().limit(10);
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

app.put("/api/movies/:id", async (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  let movie = req.body;
  let status = await db
    .collection("movies")
    .updateOne({ _id: id }, { $set: { plot: movie.plot } });
  res.json(status);
});

app.listen(5000, () => console.log("Running on port 5000..."));
