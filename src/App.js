import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import AddMovieForm from './components/AddMovieForm';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import EditMovieForm from './components/EditMovieForm';

import { moviesUrl } from './utilities/utilities';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect( () => {
    axios
			.get('http://localhost:9000/api/movies')
			.then((res) => {
				setMovies(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
  }, [movies])


  const deleteMovie = (id) => {
    const url = `${moviesUrl}/${id}`
    // Make a DELETE request using Axios
    axios.delete(url)
      .then( (res) => {
				// On success update the movies list in state
        setMovies(res.data)
				// and navigate the user to /movies
        navigate('/movies')
			})
      .catch( (err) => console.log(err) )
    
    // Hand this function down to the correct component
  }

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies}/>}/>

            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie}/>}/>

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />

            <Route path='/movies/add' element={<AddMovieForm />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
