<script>
    import CarrouselCurrent from "$lib/components/Carrousel/CarrouselCurrent.svelte";
    import Calendrier from "$lib/components/Calendrier/Calendrier.svelte";
    import { filterUpcomingMovies, formatDateTextFR } from "$lib/globalFunction.js";

    export let data;
    $: upcomingMovies = data.upcomingMovies.results;

    let carouselContainer;
    const scrollAmount = 320; // Largeur d'une carte + gap

    function scrollLeft() {
        if (carouselContainer) {
            carouselContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    function scrollRight() {
        if (carouselContainer) {
            carouselContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }
</script>

<main>
    <h2 class="relative text-2xl font-bold w-fit mb-6 ml-2 mt-10">
        <span class="relative z-10 text-white">Très prochainement</span>
        <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
    </h2>

    <div class="relative">
        <button 
            class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-colors duration-300"
            on:click={scrollLeft}
            aria-label="Défiler vers la gauche"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>

        <section class="flex overflow-x-auto py-6 px-4 gap-8 cast-scroll" bind:this={carouselContainer}>
            {#each upcomingMovies as movie}
            <a href={`/film/${movie.id}`}>
                <div class="flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer w-[320px]">
                    <div class="relative w-full h-[480px] rounded-xl overflow-hidden bg-neutral-800">
                        <img
                            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} 
                            alt={movie.title}
                            class="w-full h-full object-contain"
                        />
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <h3 class="text-base font-semibold text-white text-center w-full mt-5 whitespace-normal break-words">{movie.title}</h3>
                    <span class="text-sm text-gray-400 text-center w-full mt-2 whitespace-normal break-words">{formatDateTextFR(movie.release_date)}</span>
                </div>
            </a>
            {/each}
        </section>

        <button 
            class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-lg transition-colors duration-300"
            on:click={scrollRight}
            aria-label="Défiler vers la droite"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
    </div>

    <h2 class="relative text-2xl font-bold w-fit mb-6 ml-2 mt-10">
        <span class="relative z-10 text-white">Calendrier</span>
        <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
    </h2>
    <Calendrier {upcomingMovies} />
</main>

<style>
.cast-scroll {
    scrollbar-width: thin;
    scrollbar-color: #F51010 transparent;
}

.cast-scroll::-webkit-scrollbar {
    height: 6px;
}

.cast-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.cast-scroll::-webkit-scrollbar-thumb {
    background: #F51010;
    border-radius: 3px;
}
</style>

