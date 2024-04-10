import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { getById, putById, getAllMovies } from '../actions/EditMovieForm'
import { moviesUrl } from '../utilities/utilities'

const EditMovieForm = (props) => {
  // const { push } = useHistory()
  const { id } = useParams()
  const navigate = useNavigate();

  const { setMovies } = props;

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
  });

  // We need to be able to load in the current movie's attributes into our local form state. When `EditMovieForm` mount, retrieve our current id's movie from the api and save the data returned to local state.

  useEffect( () => {
    getById(id).then( (res) => {
      const { title, director, genre, metascore, description} = res
      setMovie({
        title: title,
        director: director,
        genre: genre,
        metascore: metascore,
        description: description,
      })
    })
  }, [])

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make your put request here
    putById(id, movie)
    // On success, set the updated movies in state
    getAllMovies().then( (res) => setMovies(res))
    // and also navigate the app to the updated movie path
      navigate(`/movies/${id}`);
    
  }

  const { title, director, genre, metascore, description } = movie;

  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Metascore</label>
              <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
            </div>

          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-info" value="Save" />
            <Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
          </div>
        </form>
      </div>
    </div>);
}

export default EditMovieForm;
