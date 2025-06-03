<script>
import { convertScore } from "$lib/globalFunction.js";
  export let upcomingMovies;
  
  // État pour le mois/année actuels
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  // État pour mobile - jour sélectionné
  let selectedDayIndex = 0;
  
  // État pour les films expandés
  let expandedFilms = new Set();
  
  // Noms des mois en français
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  // Fonction pour obtenir tous les mercredis du mois
  function getWednesdaysOfMonth(year, month) {
    const wednesdays = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Trouver le premier mercredi du mois (mercredi = 3)
    let currentDate = new Date(firstDay);
    while (currentDate.getDay() !== 3) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate > lastDay) break;
    }
    
    // Ajouter tous les mercredis
    while (currentDate <= lastDay) {
      wednesdays.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return wednesdays;
  }
  
  // Fonction pour organiser les films par date
  function organizeMoviesByWednesdays(movies, wednesdays) {
    if (!movies || !Array.isArray(movies)) {
      return {};
    }
    
    const organized = {};
    
    wednesdays.forEach((wednesday, index) => {
      organized[index] = movies.filter(movie => {
        if (!movie.release_date) return false;
        
        const releaseDate = new Date(movie.release_date);
        const nextWednesday = new Date(wednesday);
        nextWednesday.setDate(nextWednesday.getDate() + 7);
        
        
        return releaseDate >= wednesday && releaseDate < nextWednesday;
      });
    });
    
    return organized;
  }
  
  // Fonction pour formater la date
  function formatDate(date) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
  
  // Navigation
  function previousMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    expandedFilms.clear();
    expandedFilms = expandedFilms;
    selectedDayIndex = 0;
  }
  
  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    expandedFilms.clear();
    expandedFilms = expandedFilms;
    selectedDayIndex = 0;
  }
  
  // Navigation jour suivant/précédent sur mobile
  function previousDay() {
    if (selectedDayIndex > 0) {
      selectedDayIndex--;
    }
  }
  
  function nextDay() {
    if (selectedDayIndex < wednesdays.length - 1) {
      selectedDayIndex++;
    }
  }
  
  // Gestion des clics sur les films
  function handleFilmClick(filmId) {
    if (expandedFilms.has(filmId)) {
      // Deuxième clic = redirection
      window.location.href = `/film/${filmId}`;
    } else {
      // Premier clic = expansion
      expandedFilms.add(filmId);
      expandedFilms = expandedFilms;
    }
  }
  
  // Fermer un film expandé
  function closeFilm(filmId, event) {
    event.stopPropagation();
    expandedFilms.delete(filmId);
    expandedFilms = expandedFilms;
  }
  
  // Gestion des touches clavier pour l'accessibilité
  function handleKeyDown(event, action, ...args) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action(...args);
    }
  }
  
  $: wednesdays = getWednesdaysOfMonth(currentYear, currentMonth);
  $: organizedMovies = organizeMoviesByWednesdays(upcomingMovies, wednesdays);
  $: numberOfWednesdays = wednesdays.length;
</script>

<!-- Calendrier -->
<div class="bg-black text-white min-h-screen p-3">
  <div class="max-w-full mx-auto">
    
    <!-- Navigation du calendrier -->
    <div class="flex items-center justify-center mb-8">
      <button 
        on:click={previousMonth}
        class="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Mois précédent"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <h1 class="mx-8 text-2xl font-bold">
        {months[currentMonth]} {currentYear}
      </h1>
      
      <button 
        on:click={nextMonth}
        class="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Mois suivant"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Navigation jour sur mobile -->
    <div class="md:hidden flex items-center justify-center mb-6">
      <button 
        on:click={previousDay}
        disabled={selectedDayIndex === 0}
        class="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Jour précédent"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <span class="mx-4 text-lg font-semibold">
        {wednesdays[selectedDayIndex] ? formatDate(wednesdays[selectedDayIndex]) : ''}
      </span>
      
      <button 
        on:click={nextDay}
        disabled={selectedDayIndex === wednesdays.length - 1}
        class="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Jour suivant"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Vue desktop - grille des mercredis sur 1 ligne -->
    <div class="hidden md:block">
      <div class="grid gap-4" style="grid-template-columns: repeat({numberOfWednesdays}, 1fr);">
        {#each wednesdays as wednesday, wednesdayIndex}
          <div class="flex flex-col">
            
            <!-- Date du mercredi -->
            <h2 class="text-xl font-bold text-center mb-4 text-white">
              {formatDate(wednesday)}
            </h2>
            
            <!-- Container des films avec bordure blanche -->
            <div class="bg-transparent border-2 border-white rounded-2xl p-4 min-h-[400px] flex-1">
              
              <!-- Films du mercredi -->
              <div class="space-y-3">
                {#if organizedMovies[wednesdayIndex] && organizedMovies[wednesdayIndex].length > 0}
                  {#each organizedMovies[wednesdayIndex] as film}
                    
                    <!-- Carte de film -->
                    <div
                      class="w-full cursor-pointer transition-all duration-300 {expandedFilms.has(film.id) ? 'bg-gray-800' : 'bg-transparent hover:bg-gray-900'} rounded-xl overflow-hidden text-left"
                      on:click={() => handleFilmClick(film.id)}
                      on:keydown={(e) => handleKeyDown(e, handleFilmClick, film.id)}
                      role="button"
                      tabindex="0"
                      aria-label="Film {film.title}"
                    >
                      
                      {#if !expandedFilms.has(film.id)}
                        <!-- Vue compacte -->
                        <div class="flex items-center gap-3 p-2">
                          <img 
                            src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} 
                            alt={film.title}
                            class="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                            on:error={(e) => {
                              e.target.src = 'https://via.placeholder.com/48x64/1f2937/ffffff?text=F';
                            }}
                          />
                          <h3 class="font-bold text-sm text-white line-clamp-2 flex-1">
                            {film.title}
                          </h3>
                        </div>
                      {:else}
                        <!-- Vue expandée -->
                        <div class="p-4 relative">
                          
                          <!-- Bouton fermer -->
                          <button
                            class="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded-full transition-colors"
                            on:click={(e) => closeFilm(film.id, e)}
                            on:keydown={(e) => handleKeyDown(e, closeFilm, film.id, e)}
                            aria-label="Fermer"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                          
                          <div class="flex gap-4 mb-4">
                            <img 
                              src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} 
                              alt={film.title}
                              class="w-20 h-28 object-cover rounded-lg flex-shrink-0"
                              on:error={(e) => {
                                e.target.src = 'https://via.placeholder.com/80x112/1f2937/ffffff?text=Film';
                              }}
                            />
                            <div class="flex-1 pr-6">
                              <h3 class="font-bold text-lg mb-2 text-white">
                                {film.title}
                              </h3>
                              
                              <div class="flex items-center gap-2 mb-3 text-sm text-gray-400">
                                <span> {convertScore(film.vote_average)} %</span>
                                <span>•</span>
                                <span>{new Date(film.release_date).toLocaleDateString('fr-FR')}</span>
                              </div>
                              
                              {#if film.overview}
                                <div class="text-sm text-gray-300">
                                  <p class="font-semibold mb-1">Synopsis :</p>
                                  <p class="line-clamp-4">{film.overview}</p>
                                </div>
                              {/if}
                            </div>
                          </div>
                          
                          <div class="text-center">
                            <p class="text-xs text-gray-500">Cliquez à nouveau pour voir le film</p>
                          </div>
                        </div>
                      {/if}
                    </div>
                  {/each}
                {:else}
                  <!-- Mercredi sans films -->
                  <div class="text-center text-gray-500 py-8">
                    <p class="text-sm">Aucun film prévu</p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Vue mobile - un seul jour -->
    <div class="md:hidden">
      {#if wednesdays[selectedDayIndex]}
        <div class="flex flex-col">
          
          <!-- Container des films avec bordure blanche -->
          <div class="bg-transparent border-2 border-white rounded-2xl p-4 min-h-[400px] flex-1">
            
            <!-- Films du jour sélectionné -->
            <div class="space-y-3">
              {#if organizedMovies[selectedDayIndex] && organizedMovies[selectedDayIndex].length > 0}
                {#each organizedMovies[selectedDayIndex] as film}
                  
                  <!-- Carte de film -->
                  <div
                    class="w-full cursor-pointer transition-all duration-300 {expandedFilms.has(film.id) ? 'bg-gray-800' : 'bg-transparent hover:bg-gray-900'} rounded-xl overflow-hidden text-left"
                    on:click={() => handleFilmClick(film.id)}
                    on:keydown={(e) => handleKeyDown(e, handleFilmClick, film.id)}
                    role="button"
                    tabindex="0"
                    aria-label="Film {film.title}"
                  >
                    
                    {#if !expandedFilms.has(film.id)}
                      <!-- Vue compacte -->
                      <div class="flex items-center gap-3 p-2">
                        <img 
                          src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} 
                          alt={film.title}
                          class="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                          on:error={(e) => {
                            e.target.src = 'https://via.placeholder.com/48x64/1f2937/ffffff?text=F';
                          }}
                        />
                        <h3 class="font-bold text-sm text-white line-clamp-2 flex-1">
                          {film.title}
                        </h3>
                      </div>
                    {:else}
                      <!-- Vue expandée -->
                      <div class="p-4 relative">
                        
                        <!-- Bouton fermer -->
                        <button
                          class="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded-full transition-colors"
                          on:click={(e) => closeFilm(film.id, e)}
                          on:keydown={(e) => handleKeyDown(e, closeFilm, film.id, e)}
                          aria-label="Fermer"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                        
                        <div class="flex gap-4 mb-4">
                          <img 
                            src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} 
                            alt={film.title}
                            class="w-20 h-28 object-cover rounded-lg flex-shrink-0"
                            on:error={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x112/1f2937/ffffff?text=Film';
                            }}
                          />
                          <div class="flex-1 pr-6">
                            <h3 class="font-bold text-lg mb-2 text-white">
                              {film.title}
                            </h3>
                            
                            <div class="flex items-center gap-2 mb-3 text-sm text-gray-400">
                              <span> {convertScore(film.vote_average)} %</span>
                              <span>•</span>
                              <span>{new Date(film.release_date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            
                            {#if film.overview}
                              <div class="text-sm text-gray-300">
                                <p class="font-semibold mb-1">Synopsis :</p>
                                <p class="line-clamp-4">{film.overview}</p>
                              </div>
                            {/if}
                          </div>
                        </div>
                        
                        <div class="text-center">
                          <p class="text-xs text-gray-500">Cliquez à nouveau pour voir le film</p>
                        </div>
                      </div>
                    {/if}
                  </div>
                {/each}
              {:else}
                <!-- Jour sans films -->
                <div class="text-center text-gray-500 py-8">
                  <p class="text-sm">Aucun film prévu</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
