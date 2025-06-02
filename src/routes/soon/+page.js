import { getUpcomingMovies } from "$lib/api.js";

export async function load({ params }) {
    const upcomingMovies = await getUpcomingMovies(params.page);

    return {
        upcomingMovies
    };
}