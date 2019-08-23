import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovieForm = props => {
  console.log("UMF", props);
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const id = props.match.params.id;
    const movieInArr = props.movies.find(movie => `${movie.id}` === id);
    if (movieInArr) setMovie(movieInArr);
  }, [props.movies, props.match.params.id]);

  const changeHandler = e => {
    console.log("I AM CHANGING");
  };

  const submitHandler = e => {
    console.log("submit pressed");
    e.preventDefault();
  };
  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={submitHandler}>
        <label>
          Movie title:
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="Title"
            value={movie.title}
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="Director"
            value={movie.director}
          />
        </label>
        <label className="metascore">
          Metascore:
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="Metascore"
            value={movie.metascore}
          />
        </label>
        <label className="stars">
          Movie Stars:
          {movie.stars.map(star => {
            return (
              <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars"
                value={star}
              />
            );
          })}
        </label>

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
