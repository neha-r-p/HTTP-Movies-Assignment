import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log(res.data);
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <SavedList list={savedList} updateMovies={setMovies} movies={movies} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              movies={movies}
              updateMovies={setMovies}
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateMovieForm
              {...props}
              movies={movies}
              updateMovies={setMovies}
            />
          );
        }}
      />
    </>
  );
};

export default App;
