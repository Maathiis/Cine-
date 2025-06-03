<script>
    import FilmHero from '$lib/components/Film/FilmHero.svelte';
    import FilmCast from '$lib/components/Film/FilmCast.svelte';
    import FilmMedia from '$lib/components/Film/FilmMedia.svelte';
    import FilmReviews from '$lib/components/Film/FilmReviews.svelte';
    import FilmRecommendations from '$lib/components/Film/FilmRecommendations.svelte';
    import FilmInfo from '$lib/components/Film/FilmInfo.svelte';
    
    export let data;
    $: movie = data.movie;
    $: credits = data.credits;
    $: videos = data.videos;
    $: images = data.images;
    $: reviews = data.reviews;

$: movieData = {
    title: movie.title,
    year: movie.release_date.split('-')[0],
    date: movie.release_date,
    duration: movie.runtime,
    genres: movie.genres.map(genre => genre.name),
    score: movie.vote_average,
    synopsis: movie.overview,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
};

$: castData = credits.cast;

$: mediaData = {
    trailers: {
        trailers: videos.results,
    },  
    images: { images: images.backdrops },
    posters: { posters: images.posters }
};

$: reviewsData = reviews.results;

$: recommendationsData = data.recommendations.results;

$: filmInfo = data.details;
   
// Pour scroll et focus sur la section media
let mediaSection;
let blinkTimeout;
function handleShowTrailers() {
  // Scroll fluide jusqu'à la section media
  const el = document.getElementById('media-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Ajoute la classe de clignotement
    el.classList.add('blink-media');
    // Après le scroll, focus sur la première vidéo
    setTimeout(() => {
      // Cherche le premier lien vidéo dans l'onglet Vidéos
      const firstVideo = el.querySelector('.media-scroll a');
      if (firstVideo) {
        firstVideo.focus();
      } else {
        // Si pas trouvé, focus sur la section media
        el.focus();
      }
    }, 600); // délai pour laisser le scroll se terminer
    // Retire la classe après 2 secondes
    clearTimeout(blinkTimeout);
    blinkTimeout = setTimeout(() => {
      el.classList.remove('blink-media');
    }, 2000);
  }
}
</script>

<svelte:head>
    <title>Ciné + - {movieData.title}</title>
</svelte:head>

<main class="film-page">
    <div class="film-content">
        <!-- Composant 1: Hero -->
        <FilmHero movie={movieData} on:showTrailers={handleShowTrailers} />
        
        <!-- Composant 2: Cast -->
        <FilmCast cast={castData} />
        
        <!-- Composants 3 et 6: Media + Info (côte à côte) -->
        <div class="media-info-section">
            <FilmMedia media={mediaData} bind:mediaSection />
            <FilmInfo filmInfo={filmInfo} />
        </div>
        
        <!-- Composant 4: Reviews -->
        <FilmReviews reviews={reviewsData} />
        
        <!-- Composant 5: Recommendations -->
        <FilmRecommendations recommendations={recommendationsData} />
    </div>
</main>

<style>
    

    .film-page {
        min-height: 100vh;
        background-color: black;
        color: white;
        padding: 20px;
    }

    .film-content {
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
    }

    .media-info-section {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 300px;
        gap: 32px;
        margin-bottom: 32px;
        overflow: hidden;
        align-items: stretch;
        min-height: 550px;
    }

    /* Responsive */
    @media (max-width: 1200px) {
        .media-info-section {
            grid-template-columns: minmax(0, 1fr) 280px;
            gap: 24px;
            min-height: 500px;
        }
    }

    @media (max-width: 968px) {
        .media-info-section {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .film-page {
            padding: 16px;
        }
    }

    @media (max-width: 480px) {
        .film-page {
            padding: 12px;
        }

        .media-info-section {
            gap: 16px;
        }
    }

    /* Clignotement pour la section media */

    @keyframes blink-media-effect {
        from { background-color: inherit; }
        to { background-color: #F5101022; }
    }
</style>