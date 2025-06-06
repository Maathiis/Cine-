<script>
    import CardActor from "$lib/components/Card/cardActor.svelte";
    export let cast = [];

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
    <!-- Titre avec fond rouge penché -->
    <h1 class="relative text-3xl font-bold mb-8 ml-8 mt-4 w-fit">
        <span class="relative z-10 text-white">Têtes d'affiche</span>
        <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
    </h1>
    
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
    <div class="relative z-10">
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
            {#each cast as actor}
                <CardActor {actor} />
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