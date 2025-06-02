import { getCurrentMovies } from "$lib/api.js";

export async function load({ params }) {
    const currentMovies = await getCurrentMovies(params.page);

    return {
        currentMovies
    };
}