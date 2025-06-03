import { getActorDetails, getPersonMoviesCredits, getPersonKnownForMovies } from "$lib/api";

export const load = async ({ params }) => {
	const actor = await getActorDetails(params.name);
	const moviesCredits = await getPersonMoviesCredits(actor.id);
	const knownForMovies = await getPersonKnownForMovies(actor.id);
	return { actor, moviesCredits, knownForMovies };
};