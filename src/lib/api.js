const API_KEY = import.meta.env.VITE_API_KEY;

const API_URL = "https://api.themoviedb.org/3/";

const headers = {
	accept: "application/json",
	Authorization: `Bearer ${API_KEY}`,
};

/*
* Recherche de film par titre
*
* @param {string} title
* @param {number} page
* @returns {Promise}
* */
export const searchMovieByTitle = async (title, page = 1) => {
	const response = await fetch(
		`${API_URL}search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};

/*
* Récupération des films populaires
*
* @param {number} page
* @returns {Promise}
* */
export const getPopularMovies = async (page = 1) => {
	const response = await fetch(
		`${API_URL}movie/popular?language=en-US&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};

/*
* Récupération des films à venir
*
* @param {number} page
* @returns {Promise}
* */
export const getUpcomingMovies = async (page = 1) => {
	const response = await fetch(
		`${API_URL}movie/upcoming?language=en-US&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};

/*
* Récupération des films en cours de diffusion
*
* @param {number} page
* @returns {Promise}
* */
export const getCurrentMovies = async (page = 1) => {
	const response = await fetch(
		`${API_URL}movie/now_playing?language=en-US&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};


// Requêtes API pour la page film

/*
* Get movie details by id
*
* @param {number} id
* @returns {Promise}
* */

export const getMovieById = async (id) => {
	const response = await fetch(
		`${API_URL}movie/${id}?language=fr-FR`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};

/*
* Get movie credits from a movie by id
*
* @param {number} id
* @returns {Promise}
* */
export const getMovieCredits = async (id, page = 1) => {
	const response = await fetch(
		`${API_URL}movie/${id}/credits?language=fr-FR&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};


/*
* Get movie videos from a movie by id
*
* @param {number} id
* @returns {Promise}
* */
export const getMovieVideos = async (id) => {
	const response = await fetch(
		`${API_URL}movie/${id}/videos?language=fr-FR`,
		{
			method: "GET",
			headers,
			});
	return  response.json();
};


/*
* Get movie images from a movie by id
*
* @param {number} id
* @returns {Promise}
* */
export const getMovieImages = async (id) => {
	const response = await fetch(
		`${API_URL}movie/${id}/images`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};


/*
* Get reviews from a movie by id
*
* @param {number} id
* @returns {Promise}
* */
export const getMovieReviews = async (id, page = 1) => {
	const response = await fetch(
		`${API_URL}movie/${id}/reviews?language=fr-FR&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};

/*
* Get movie recommendations from a movie by id
*
* @param {number} id
* @returns {Promise}
* */
export const getMovieRecommendations = async (id, page = 1) => {
	const response = await fetch(
		`${API_URL}movie/${id}/recommendations?language=fr-FR&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};


//Page Acteur

/*
* Get details from an actor by id with his filmography
*
* @param {number} id
* @returns {Promise}
*
* */

export const getActorDetails = async (id, page = 1) => {
	const response = await fetch(
		`${API_URL}person/${id}??append_to_response=movie_credits&language=fr-FR&page=${page}`,
		{
			method: "GET",
			headers,
		});
	return  response.json();
};

