<script>
    export let data;
    
    // États pour la navigation
    let currentYear = new Date().getFullYear();
    let currentMode = 'cast'; // 'cast' ou 'crew'
    let currentPage = 0;
    
    // Responsive pour le nombre d'items par page
    let innerWidth = 0;
    $: itemsPerPage = innerWidth < 768 ? 2 : 4; // 2 sur mobile/tablette, 4 sur desktop
    
    // Fonction pour organiser les films par année
    function organizeMoviesByYear(movies) {
      if (!movies || !Array.isArray(movies))
      return {};
      
      const organized = {};
      movies.forEach(movie => {
        if (!movie.release_date) return;
        
        const year = new Date(movie.release_date).getFullYear();
        if (!organized[year]) {
          organized[year] = [];
        }
        organized[year].push(movie);
      });
      
      // Trier chaque année par date de sortie
      Object.keys(organized).forEach(year => {
        organized[year].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      });
      return organized;
    }
    
    // Fonction pour obtenir les années disponibles
    function getAvailableYears(castMovies, crewMovies) {
      const years = new Set();
      
      [...(castMovies || []), ...(crewMovies || [])].forEach(movie => {
        if (movie.release_date) {
          years.add(new Date(movie.release_date).getFullYear());
        }
      });
      
      return Array.from(years).sort((a, b) => b - a);
    }
    
    // Navigation année
    function previousYear() {
      const availableYears = getAvailableYears(data.moviesCredits.cast, data.moviesCredits.crew);
      const currentIndex = availableYears.indexOf(currentYear);
      if (currentIndex < availableYears.length - 1) {
        currentYear = availableYears[currentIndex + 1];
        currentPage = 0;
      }
    }
    
    function nextYear() {
      const availableYears = getAvailableYears(data.moviesCredits.cast, data.moviesCredits.crew);
      const currentIndex = availableYears.indexOf(currentYear);
      if (currentIndex > 0) {
        currentYear = availableYears[currentIndex - 1];
        currentPage = 0;
      }
    }
    
    // Changer de mode (cast/crew)
    function switchMode(mode) {
      currentMode = mode;
      currentPage = 0;
    }
    
    // Navigation pagination
    function previousPage() {
      if (currentPage > 0) {
        currentPage--;
      }
    }
    
    function nextPage() {
      const maxPages = Math.ceil(currentMovies.length / itemsPerPage) - 1;
      if (currentPage < maxPages) {
        currentPage++;
      }
    }
    
    // Obtenir les films actuels selon le mode et l'année
    function getCurrentMovies(year, mode) {
      const movies = mode === 'cast' ? data.moviesCredits.cast : data.moviesCredits.crew;
      const organizedMovies = organizeMoviesByYear(movies);
      return organizedMovies[year] || [];
    }
    
    // Obtenir les films de la page actuelle
    function getPageMovies(movies, page) {
      const start = currentPage * itemsPerPage;
      
      return movies.slice(start, start + itemsPerPage);
    }
    
    // Formater la date
    function formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    }
    
    // Calculer la position sur la timeline (0-100%)
    function getTimelinePosition(movie, movies) {
      if (movies.length <= 1) return 50;
      
      const movieDate = new Date(movie.release_date);
      const firstDate = new Date(movies[0].release_date);
      const lastDate = new Date(movies[movies.length - 1].release_date);
      
      if (firstDate.getTime() === lastDate.getTime()) return 50;
      
      const totalTime = lastDate.getTime() - firstDate.getTime();
      const movieTime = movieDate.getTime() - firstDate.getTime();
      
      // Position entre 10% et 90% pour éviter les bords
      return 10 + (movieTime / totalTime) * 80;
    }
    
    // Reactive statements
    $: availableYears = getAvailableYears(data.moviesCredits.cast, data.moviesCredits.crew);
    
    // Initialiser currentYear avec la première année disponible si nécessaire
    $: if (availableYears.length > 0 && !availableYears.includes(currentYear)) {
      currentYear = availableYears[0];
      currentPage = 0;
    }
    
    $: currentMovies = getCurrentMovies(currentYear, currentMode);
    $: pageMovies = getPageMovies(currentMovies, currentPage);
    $: totalPages = Math.ceil(currentMovies.length / itemsPerPage);
    $: canGoBack = availableYears.indexOf(currentYear) < availableYears.length - 1;
    $: canGoForward = availableYears.indexOf(currentYear) > 0;
</script>

<svelte:window bind:innerWidth />

<div class="bg-black text-white min-h-screen p-6">
  <div class="max-w-7xl mx-auto">
    
    <!-- Header avec navigation année -->
    <div class="flex items-center justify-center mb-8">
      <button 
        on:click={previousYear}
        disabled={!canGoBack}
        class="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Année précédente"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <h1 class="mx-4 md:mx-8 text-3xl md:text-4xl font-bold">
        {currentYear}
      </h1>
      
      <button 
        on:click={nextYear}
        disabled={!canGoForward}
        class="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Année suivante"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Boutons Cast/Crew -->
    <div class="flex justify-center mb-8 md:mb-12">
      <div class="bg-gray-800 rounded-full p-1 flex">
        <button
          on:click={() => switchMode('cast')}
          class="px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base {currentMode === 'cast' ? 'bg-white text-black' : 'text-white hover:bg-gray-700'}"
        >
          Acteur ({(data.moviesCredits.cast || []).length})
        </button>
        <button
          on:click={() => switchMode('crew')}
          class="px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base {currentMode === 'crew' ? 'bg-white text-black' : 'text-white hover:bg-gray-700'}"
        >
          Équipe technique ({(data.moviesCredits.crew || []).length})
        </button>
      </div>
    </div>

    <!-- Timeline -->
    {#if pageMovies.length > 0}
      <div class="relative min-h-[400px] md:min-h-[500px] mb-8">
        
        <!-- Ligne horizontale principale -->
        <div class="absolute top-[200px] md:top-[250px] left-0 right-0 h-px bg-white"></div>
        
        <!-- Films positionnés sur la timeline -->
        {#each pageMovies as movie, index}
          {@const isAbove = index % 2 === 0}
          {@const position = (index + 1) * (100 / (pageMovies.length + 1))}
          
          {#if isAbove}
            <!-- Film au-dessus de la ligne -->
            <div 
              class="absolute transform -translate-x-1/2"
              style="left: {position}%; top: 20px;"
            >
              <!-- Contenu du film avec hauteur fixe -->
              <div class="mb-4 max-w-[200px] md:max-w-[250px] h-[100px] md:h-[120px] flex flex-col justify-end">
                <h3 class="font-bold text-sm md:text-lg mb-1 text-center line-clamp-2">
                  {movie.title || movie.name}
                </h3>
                
                <p class="text-red-500 text-xs md:text-sm text-center mb-1 line-clamp-1">
                  {#if currentMode === 'cast'}
                    {movie.character || 'Rôle non spécifié'}
                  {:else}
                    {movie.job || movie.department || 'Poste non spécifié'}
                  {/if}
                </p>
                
                <p class="text-gray-400 text-xs md:text-sm text-center">
                  {formatDate(movie.release_date)}
                </p>
              </div>
              
              <!-- Ligne verticale fixe -->
              <div class="w-px h-[60px] md:h-[80px] bg-white mx-auto"></div>
              
              <!-- Point sur la ligne principale -->
              <div class="w-3 h-3 bg-white rounded-full mx-auto"></div>
            </div>
          {:else}
            <!-- Film en-dessous de la ligne -->
            <div 
              class="absolute transform -translate-x-1/2 !top-[200px] md:!top-[250px]"
              style="left: {position}%;"
            >
              <!-- Point sur la ligne principale -->
              <div class="w-3 h-3 bg-white rounded-full mx-auto"></div>
              
              <!-- Ligne verticale fixe -->
              <div class="w-px h-[60px] md:h-[80px] bg-white mx-auto"></div>
              
              <!-- Contenu du film avec hauteur fixe -->
              <div class="mt-4 max-w-[200px] md:max-w-[250px] h-[100px] md:h-[120px] flex flex-col justify-start">
                <h3 class="font-bold text-sm md:text-lg mb-1 text-center line-clamp-2">
                  {movie.title || movie.name}
                </h3>
                
                <p class="text-red-500 text-xs md:text-sm text-center mb-1 line-clamp-1">
                  {#if currentMode === 'cast'}
                    {movie.character || 'Rôle non spécifié'}
                  {:else}
                    {movie.job || movie.department || 'Poste non spécifié'}
                  {/if}
                </p>
                
                <p class="text-gray-400 text-xs md:text-sm text-center">
                  {formatDate(movie.release_date)}
                </p>
              </div>
            </div>
          {/if}
        {/each}
      </div>

      <!-- Navigation pagination -->
      {#if totalPages > 1}
        <div class="flex items-center justify-center gap-4 mb-6">
          <button
            on:click={previousPage}
            disabled={currentPage === 0}
            class="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Page précédente"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <!-- Indicateurs de page -->
          <div class="flex gap-2">
            {#each Array(totalPages) as _, pageIndex}
              <button
                on:click={() => currentPage = pageIndex}
                class="w-3 h-3 rounded-full transition-colors {currentPage === pageIndex ? 'bg-white' : 'bg-gray-600 hover:bg-gray-500'}"
                aria-label="Page {pageIndex + 1}"
              ></button>
            {/each}
          </div>
          
          <button
            on:click={nextPage}
            disabled={currentPage === totalPages - 1}
            class="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Page suivante"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      {/if}

    {:else}
      <!-- Aucun film pour cette année -->
      <div class="text-center py-16">
        <p class="text-gray-400 text-lg">
          Aucun film en {currentYear} en tant que {currentMode === 'cast' ? 'acteur' : 'membre de l\'équipe technique'}
        </p>
      </div>
    {/if}

    <!-- Informations supplémentaires -->
    <div class="text-center text-gray-500 text-sm mt-8">
      <p>
        {currentMovies.length} film{currentMovies.length > 1 ? 's' : ''} en {currentYear}
        {#if totalPages > 1}
          • Page {currentPage + 1} sur {totalPages}
        {/if}
      </p>
    </div>

  </div>
</div>

<style>
  /* Animation pour le slide entre cast/crew */
  button {
    transition: all 0.3s ease;
  }
</style>