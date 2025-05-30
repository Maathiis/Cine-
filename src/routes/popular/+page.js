import { getPopularMovies } from '$lib/api.js';
import { getMovieById } from '$lib/api.js';
import { getMovieCredits } from '$lib/api.js';

export async function load() {
  // Récupérer les films populaires
  const PopularMovies = await getPopularMovies();
  const movies = PopularMovies?.results || [];

  // Récupérer les détails pour chaque film
  const MovieDetails = await Promise.all(
    movies.map(movie => getMovieById(movie.id))
  );

  // Récupérer les crédits pour chaque film
  const MovieCredits = await Promise.all(
    movies.map(movie => getMovieCredits(movie.id))
  );

  return {
    PopularMovies,
    MovieDetails,
    MovieCredits
  };
}