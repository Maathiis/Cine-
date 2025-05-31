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
</script>

<div class="mb-8 text-white min-w-0 overflow-hidden h-full">
    <div class="bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-xl p-6 border border-neutral-600 h-full flex flex-col">
        <!-- Header : Titre en position absolue + Tabs centrés sur toute la largeur -->
        <div class="relative mb-4 header-responsive">
            <!-- Titre positionné à gauche -->
            <div class="absolute left-0 top-0 title-responsive">
                <h1 class="relative text-2xl font-bold mb-0 w-fit">
                    <span class="relative z-10 text-white py-2 px-4 inline-block">Média</span>
                    <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-2"></span>
                </h1>
            </div>
            
            <!-- Tabs centrés sur TOUTE la largeur -->
            <div class="w-full flex justify-center tabs-responsive">
                <div class="flex gap-0.5 bg-neutral-600 rounded-lg p-1">
                    {#each tabs as tab}
                        <button 
                            class="px-5 py-3 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap
                                   {tab.name === activeTab 
                                     ? 'bg-[#F51010] text-white' 
                                     : 'bg-transparent text-neutral-300 hover:bg-neutral-500 hover:text-white'}"
                            on:click={() => setActiveTab(tab.name)}
                        >
                            {tab.name}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Contenu utilisant TOUTE la hauteur restante -->
        <div class="flex-1 overflow-hidden">
            {#if activeTab === 'Vidéos'}
                <div class="overflow-x-auto pb-2 media-scroll h-full">
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
            {:else if activeTab === 'Images'}
                {#if media.images.images.length > 0}
                    <div class="overflow-x-auto pb-2 media-scroll h-full">
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
                {:else}
                    <div class="text-center h-full flex items-center justify-center text-neutral-500 text-lg">
                        <p>Aucune image disponible</p>
                    </div>
                {/if}
            {:else if activeTab === 'Affiches'}
                {#if media.posters.posters.length > 0}
                    <div class="overflow-x-auto pb-2 media-scroll h-full">
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
                {:else}
                    <div class="text-center h-full flex items-center justify-center text-neutral-500 text-lg">
                        <p>Aucune affiche disponible</p>
                    </div>
                {/if}
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