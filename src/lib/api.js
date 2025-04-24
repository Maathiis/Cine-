const API_KEY = import.meta.env.VITE_API_KEY;

const API_URL = "https://api.themoviedb.org/3/";

const headers = {
	accept: "application/json",
	Authorization: `Bearer ${API_KEY}`,
};

/**/
export const searchMovieByTitle = async (title, page = 1) => {
	const response = await fetch(
		`${API_URL}search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
		{
			method: "GET",
			headers,
		}
	);
	return  response.json();
};
