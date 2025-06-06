<script>
    import { getScoreColor, convertScore } from "$lib/globalFunction.js";
    export let currentMovies;
    export let number1;
    export let number2;

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

<div class="relative">
    <button 
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-colors duration-300"
        on:click={scrollLeft}
        aria-label="Défiler vers la gauche"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
        </svg>
    </button>

    <section 
        class="flex overflow-x-auto py-6 px-4 gap-8 cast-scroll"
        bind:this={carouselContainer}
    >
        {#each currentMovies.slice(number1, number2) as movie}
        <a href={`/film/${movie.id}`}>
            <div class="flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer w-[320px]">
                <div class="relative w-full h-[480px] rounded-xl overflow-hidden bg-neutral-800">
                    <img
                        src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} 
                        alt={movie.title}
                        class="w-full h-full object-contain"
                    />
                    <div class="absolute top-2 right-2">
                        <div class="relative w-10 h-10 bg-black/80 rounded-full flex items-center justify-center">
                            <svg width="40" height="40" class="absolute transform -rotate-90">
                                <circle cx="20" cy="20" r="16" fill="none" stroke="#333" stroke-width="3"/>
                                <circle
                                    cx="20" cy="20" r="16"
                                    fill="none"
                                    stroke={getScoreColor(convertScore(movie.vote_average))}
                                    stroke-width="3"
                                    stroke-dasharray="100"
                                    stroke-dashoffset={100 - (100 * convertScore(movie.vote_average) / 100)}
                                    stroke-linecap="round"
                                    class="score-progress"
                                />
                            </svg>
                            <span class="text-white text-xs font-bold z-10">{convertScore(movie.vote_average)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="text-base font-semibold text-white text-center w-full mt-5 whitespace-normal break-words">{movie.title}</h3>
        </a>
        {/each}
    </section>

    <button 
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-lg transition-colors duration-300"
        on:click={scrollRight}
        aria-label="Défiler vers la droite"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
        </svg>
    </button>
</div>

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

  .score-progress {
      transition: stroke-dashoffset 0.5s ease;
  }
</style>
