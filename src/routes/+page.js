import { getUpcomingMovies, getCurrentMovies } from "$lib/api.js";

export async function load({ params }) {
    const upcomingMovies = await getUpcomingMovies(params.page);
    const currentMovies = await getCurrentMovies(params.page);

    return {
        upcomingMovies,
        currentMovies
    };
}