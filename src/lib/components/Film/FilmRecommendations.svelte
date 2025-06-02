<script>
    import { getScoreColor, convertScore } from "$lib/globalFunction.js";

    export let recommendations;
</script>

<div class="film-recommendations mb-8 text-white">
    <h1 class="relative text-2xl font-bold mb-4 w-fit">
        <span class="relative z-10 text-white py-2 px-4 inline-block">Recommandations</span>
        <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-2"></span>
    </h1>

    <div class="flex overflow-x-auto py-6 px-4 gap-8 cast-scroll">
        {#if recommendations.length > 0}
            {#each recommendations as movie}
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
                    <h3 class="text-base font-semibold text-white text-center w-full mt-2 whitespace-normal break-words">
                        {movie.title}
                    </h3>
                </div>
            </a>
            {/each}
        {:else}
            <p class="text-white text-center">Aucune recommandation disponible</p>
        {/if}
    </div>
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