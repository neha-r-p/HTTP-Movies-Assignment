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
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const starsChangeHandler = (e, i) => {
    e.persist();
    let starArray = [...movie.stars];
    starArray[i] = e.target.value;
    setMovie({
      ...movie, //keeps previous movies
      stars: starArray
    });
  };

  const submitHandler = e => {
    console.log("submit pressed");
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(initialMovie);
        let tmp = props.movies.map(movie => {
          if (`${movie.id}` === props.match.params.id) {
            return res.data;
          } else {
            return movie;
          }
        });
        props.updateMovies(tmp);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
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
          Actors:
          {movie.stars.map((star, i) => {
            return (
              <input
                type="text"
                name="stars"
                onChange={e => starsChangeHandler(e, i)}
                placeholder="Actor Name"
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
