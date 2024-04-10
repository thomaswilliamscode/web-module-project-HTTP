import axios from 'axios'

import { moviesUrl } from '../utilities/utilities'

export const getById = (id) => {

	const movieUrl = `${moviesUrl}/${id}`

	return axios.get(movieUrl)
		.then( (res) => res.data )
		.catch( (err) => console.log(err) )

}

export const putById = ( id, data ) => {

	const movieUrl = `${moviesUrl}/${id}`;

	return axios
		.put(movieUrl, data)
		.then((res) => res.data)
		.catch((err) => console.log(err));

}

export const getAllMovies = () => {

	return axios
		.get(moviesUrl)
		.then( (res) => res.data)
		.catch( (err) => console.log(err) )
}

export const postMovie = (data) => {
	return axios
		.post(moviesUrl, data)
		.then( () => {
			
		} )
		.catch( (err) => console.log(err) )
}