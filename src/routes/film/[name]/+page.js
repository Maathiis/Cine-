import {
    getMovieById,
    getMovieCredits,
    getMovieVideos,
    getMovieImages,
    getMovieReviews,
    getMovieRecommendations,
    getMovieDetails
} from '$lib/api.js';

export async function load({ params }) {
    const movie = await getMovieById(params.name);
    const credits = await getMovieCredits(params.name);
    const videos = await getMovieVideos(params.name);
    const images = await getMovieImages(params.name);
    const reviews = await getMovieReviews(params.name);
    const recommendations = await getMovieRecommendations(params.name);
    const details = await getMovieDetails(params.name);

    return {
        movie,
        credits,
        videos,
        images,
        reviews,
        recommendations,
        details
    };
}