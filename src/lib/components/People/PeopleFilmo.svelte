<script>
    import CardFilm from "$lib/components/Card/CardFilm.svelte";
    export let knownForMovies;

    let carouselContainer;
    const scrollAmount = 180; // Largeur d'une carte + gap

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

<div class="mb-8 text-white relative">
    
    <!-- SVG rouge en arrière-plan -->
    <div class="absolute inset-0 z-0 top-20">
        <svg 
            viewBox="0 0 300 150" 
            class="w-full h-56 md:h-64 lg:h-72" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="none"
        >
            <path 
                d="M0,0 Q150,50 300,0 V150 H0 Z" 
                fill="#F51010" 
            />
        </svg>
    </div>
    
    <!-- Container des cartes - positionné au-dessus du SVG -->
    <div class="relative ml-4 z-10">
        <!-- Bouton gauche -->
        <button 
            class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-colors duration-300"
            on:click={scrollLeft}
            aria-label="Défiler vers la gauche"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>

        <!-- Scroll horizontal des cartes -->
        <div 
            class="flex gap-6 overflow-x-auto pb-6 px-4 cast-scroll"
            bind:this={carouselContainer}
        >
            {#each knownForMovies as movie}
                <CardFilm {movie} />
            {/each}
        </div>

        <!-- Bouton droit -->
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
</style> 