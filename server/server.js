const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(exress.json());
const PORT = 8080;

const mongoose = require("mongoose");
const Movie = require("./models/movie");
mongoose.connect(process.env.DATABASE_URL);

app.get("/", (_, response) => {
  response.json("Root route. Roude.");
});

app.get("/movies", async (request, response) => {
  const movies = await Movie.find(request.query);
  response.json(movies);
});

app.post("/movies", async (request, response)=>{ 
    const newMovie = await Movie.create(request.body);
    response.json(newMovie);
});

app.delete("/movies/:id", async (request,response)=>{
  const deletedMovie = await Movie.findByIdAndDelete(request.params.id);
  response.json(deletedMovie);
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));