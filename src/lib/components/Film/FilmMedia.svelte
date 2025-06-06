<script>
    export let media;
    $: enrichedTrailers = media.trailers.trailers.map(trailer => ({
        ...trailer,
        thumbnail: `https://img.youtube.com/vi/${trailer.key}/0.jpg`
    }));

    let activeTab = 'Vidéos';
    const tabs = [
        { name: 'Vidéos', count: media.trailers.trailers.length },
        { name: 'Images', count: media.images.images.length },
        { name: 'Affiches', count: media.posters.posters.length }
    ];

    function setActiveTab(tabName) {
        activeTab = tabName;
    }

    let mediaSection;
    let videosContainer;
    let imagesContainer;
    let postersContainer;
    const scrollAmount = 384; // Largeur d'une carte + gap

    function scrollLeft(container) {
        if (container) {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    function scrollRight(container) {
        if (container) {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }
</script>

<div id="media-section" class="mb-8 text-white min-w-0 overflow-hidden h-full" bind:this={mediaSection} tabindex="-1">
    <div class="bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-xl p-6 border border-neutral-600 h-full flex flex-col">
        <!-- Header : Titre en position absolue + Tabs centrés sur toute la largeur -->
        <div class="header-responsive mb-6">
            <h2 class="title-responsive text-2xl font-bold mb-4">Médias</h2>
            <div class="tabs-responsive flex gap-4">
                {#each tabs as tab}
                    <button
                        class="px-4 py-2 rounded-lg transition-colors duration-300 {activeTab === tab.name ? 'bg-[#F51010] text-white' : 'bg-neutral-600 text-gray-300 hover:bg-neutral-500'}"
                        on:click={() => setActiveTab(tab.name)}
                    >
                        {tab.name} ({tab.count})
                    </button>
                {/each}
            </div>
        </div>

        <div class="flex-1 overflow-hidden">
            {#if activeTab === 'Vidéos'}
                <div class="relative">
                    <button 
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-colors duration-300"
                        on:click={() => scrollLeft(videosContainer)}
                        aria-label="Défiler vers la gauche"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>

                    <div class="overflow-x-auto pb-2 media-scroll h-full" bind:this={videosContainer}>
                        <div class="flex gap-6 w-max h-full items-center">
                            {#each enrichedTrailers as trailer}
                                <div class="flex-shrink-0">
                                    <a href={"https://www.youtube.com/watch?v=" + trailer.key} target="_blank" rel="noopener noreferrer" class="block transition-transform duration-300 hover:scale-105">
                                        <div class="relative w-96 h-60 rounded-xl overflow-hidden bg-neutral-600 mb-2">
                                            <img src={trailer.thumbnail} alt={trailer.name} class="w-full h-full object-cover" />
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <div class="bg-black bg-opacity-70 rounded-full p-4 transition-colors duration-300 hover:bg-[#F51010] hover:bg-opacity-80">
                                                    <svg width="48" height="48" fill="white" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038L11 7.055a.5.5 0 0 1 0 .89L6.791 9.907a.5.5 0 0 1-.791-.39V5.5a.5.5 0 0 1 .271-.445z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 class="text-sm font-semibold text-white truncate text-center w-96">{trailer.name}</h3>
                                    </a>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <button 
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-lg transition-colors duration-300"
                        on:click={() => scrollRight(videosContainer)}
                        aria-label="Défiler vers la droite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            {:else if activeTab === 'Images'}
                <div class="relative">
                    <button 
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-colors duration-300"
                        on:click={() => scrollLeft(imagesContainer)}
                        aria-label="Défiler vers la gauche"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>

                    <div class="overflow-x-auto pb-2 media-scroll h-full" bind:this={imagesContainer}>
                        <div class="flex gap-6 w-max h-full items-center">
                            {#each media.images.images as image}
                                <div class="flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
                                    <div class="relative w-80 h-72 rounded-xl overflow-hidden bg-neutral-600">
                                        <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt="" class="w-full h-full object-cover" />
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <button 
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-lg transition-colors duration-300"
                        on:click={() => scrollRight(imagesContainer)}
                        aria-label="Défiler vers la droite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            {:else if activeTab === 'Affiches'}
                <div class="relative">
                    <button 
                        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-colors duration-300"
                        on:click={() => scrollLeft(postersContainer)}
                        aria-label="Défiler vers la gauche"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>

                    <div class="overflow-x-auto pb-2 media-scroll h-full" bind:this={postersContainer}>
                        <div class="flex gap-6 w-max h-full items-center">
                            {#each media.posters.posters as poster}
                                <div class="flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
                                    <div class="relative w-48 h-72 rounded-xl overflow-hidden bg-neutral-600">
                                        <img src={`https://image.tmdb.org/t/p/w500${poster.file_path}`} alt="" class="w-full h-full object-cover" />
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <button 
                        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-lg transition-colors duration-300"
                        on:click={() => scrollRight(postersContainer)}
                        aria-label="Défiler vers la droite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .media-scroll {
        scrollbar-width: thin;
        scrollbar-color: #F51010 transparent;
    }

    .media-scroll::-webkit-scrollbar {
        height: 6px;
    }

    .media-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .media-scroll::-webkit-scrollbar-thumb {
        background: #F51010;
        border-radius: 3px;
    }

    /* Responsive : tabs sous le titre à 650px et moins */
    @media (max-width: 650px) {
        .header-responsive {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 20px;
        }

        .title-responsive {
            position: static;
        }

        .tabs-responsive {
            width: 100%;
        }
    }
</style> 