<script>
  import { filterUpcomingMovies } from "$lib/globalFunction.js";
  import Card from "$lib/components/Card/Card.svelte";
  import { onMount, onDestroy } from 'svelte';

  let isUpcoming = true;
  let currentSlide = 0;
  let autoplayInterval;
  let slideDirection = 'right'; // 'right' ou 'left'

  export let data;
  $: upcomingMovies = filterUpcomingMovies(data.upcomingMovies.results);
  $: currentMovies = data.currentMovies.results;
  $: heroMovies = currentMovies.slice(0, 5); // Les 5 premiers films

  // Fonction pour aller au slide suivant
  function nextSlide() {
    slideDirection = 'right';
    currentSlide = (currentSlide + 1) % heroMovies.length;
    resetAutoplay();
  }

  // Fonction pour aller au slide précédent
  function prevSlide() {
    slideDirection = 'left';
    currentSlide = (currentSlide - 1 + heroMovies.length) % heroMovies.length;
    resetAutoplay();
  }

  // Fonction pour aller à un slide spécifique
  function goToSlide(index) {
    slideDirection = index > currentSlide ? 'right' : 'left';
    currentSlide = index;
    resetAutoplay();
  }

  // Fonction pour réinitialiser l'autoplay
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Fonction pour démarrer l'autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 10000); // 10 secondes
  }

  // Fonction pour arrêter l'autoplay
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Démarrer l'autoplay au montage du composant
  onMount(() => {
    startAutoplay();
  });

  // Nettoyer l'interval lors de la destruction du composant
  onDestroy(() => {
    stopAutoplay();
  });

  $: film = {
    title: upcomingMovies.title,
    date: upcomingMovies.release_date,
    image: upcomingMovies.poster_path
  };

  let partenaires = [
    { src: "/images/pathe.png", alt: "Pathé" },
    { src: "/images/UGC.png", alt: "UGC" },
    { src: "/images/Kinepolis.png", alt: "Kinépolis" },
    { src: "/images/Cineville.png", alt: "Cinéville" }
  ];
</script>

<main class="bg-black text-white">
  <!-- Hero Carousel -->
  <section 
  class="relative w-screen overflow-hidden p-4 md:p-8 lg:p-12 flex flex-col items-stretch pb-12"
  aria-label="Films à l'affiche"
>
  <!-- Slides container -->
  <div class="w-full max-w-7xl mx-auto relative">
    {#each heroMovies as movie, index}
      <div 
        class="w-full flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 transition-opacity duration-700 {currentSlide === index ? 'opacity-100 block' : 'opacity-0 hidden'}"
        class:fade-in-right={currentSlide === index && slideDirection === 'right'}
        class:fade-in-left={currentSlide === index && slideDirection === 'left'}
        role="tabpanel"
        aria-labelledby={`slide-${index}`}
        id={`slide-${index}`}
      >
        <!-- Affiche -->
        <div class="w-full lg:w-2/5 flex flex-col items-center lg:items-start gap-6">
          <a 
            href={`/film/${movie.id}`} 
            aria-label={`Voir les détails de ${movie.title}`}
            on:mouseenter={stopAutoplay}
            on:mouseleave={startAutoplay}
          >
            <div class="w-3/5 lg:w-full max-w-sm mx-auto lg:mx-0">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={`Affiche du film ${movie.title}`} 
                class="object-cover rounded-xl w-full aspect-[3/4] shadow-2xl transform hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </a>
        </div>

        <!-- Contenu -->
        <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-3/5 justify-center text-center lg:text-left">
          <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold animate-fade-in-right animation-delay-300">
            {movie.title}
          </h1>
          <p class="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed animate-fade-in-right animation-delay-600 max-w-2xl mx-auto lg:mx-0">
            {movie.overview}
          </p>

          <!-- Bouton CTA -->
          <div class="animate-fade-in-right animation-delay-900">
            <a href={`/film/${movie.id}`} class="inline-block" aria-label={`Voir les détails de ${movie.title}`}> 
              <button 
                class="bg-[#F51010] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                type="button"
              >
                Voir le film
              </button>
            </a>
          </div>

          <!-- Indicateurs sous le bouton -->
          <div 
            class="flex gap-3 mt-6 justify-center lg:justify-start"
            role="tablist"
            aria-label="Navigation des films"
          >
            {#each heroMovies as _, i}
              <button 
                class="w-3 h-3 rounded-full transition-all duration-300 {currentSlide === i ? 'bg-[#F51010]' : 'bg-white/50 hover:bg-white/70'}"
                on:click={() => goToSlide(i)}
                aria-label="Aller au film {i + 1}"
                role="tab"
                aria-selected={currentSlide === i}
                type="button"
              ></button>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

 <!-- Conteneur positionné relativement au parent -->
  <div class="absolute top-40 left-0 right-0 z-20 flex justify-between px-4 md:top-1/2 md:px-8 md:transform md:-translate-y-1/2 pointer-events-none">
    <!-- Bouton gauche -->
    <button 
      class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 pointer-events-auto"
      on:click={prevSlide}
      aria-label="Film précédent"
      type="button"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <!-- Bouton droit -->
    <button 
      class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 pointer-events-auto"
      on:click={nextSlide}
      aria-label="Film suivant"
      type="button"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</section>
  

  <!-- Du moment -->
  <section class="mt-8 mb-12">
    <div class="pl-4 md:pl-8 lg:pl-12">
      <h2 class="relative text-xl md:text-2xl font-bold mb-4 w-fit">
        <span class="relative z-10 text-white">Du moment</span>
        <span class="absolute -left-2 -bottom-2 top-1 bg-[#F51010] z-0 w-[110%] h-3/4 rounded-lg -rotate-3"></span>
      </h2>
    </div>
    <div class="flex overflow-x-auto gap-4 md:gap-6 scrollbar-hide p-4 md:p-8 lg:p-12">
      {#each currentMovies as film}
        <Card {film} />
      {/each}
    </div>
  </section>

  <!-- À venir -->
  <section class="mb-12">
    <div class="pl-4 md:pl-8 lg:pl-12">
      <h2 class="relative text-xl md:text-2xl font-bold mb-4 w-fit">
        <span class="relative z-10 text-white">À venir</span>
        <span class="absolute -left-2 -bottom-2 top-1 bg-[#F51010] z-0 w-[110%] h-3/4 rounded-lg -rotate-3"></span>
      </h2>
    </div>
    <div class="flex overflow-x-auto gap-6 md:gap-10 scrollbar-hide p-4 md:p-8 lg:p-12">
      {#each upcomingMovies as film}
        <Card {film} size="large" {isUpcoming} />
      {/each}
    </div>
  </section>

  <!-- Partenaires -->
  <section class="relative mt-16">
    <!-- Courbe SVG avec hauteur augmentée -->
    <div class="absolute inset-0 z-0 top-16">
      <svg 
        viewBox="0 0 300 200" 
        class="w-full h-80 md:h-96 lg:h-[28rem]" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,0 Q150,80 300,0 V200 H0 Z" 
          fill="#F51010" 
        />
      </svg>
    </div>
    
    <!-- Contenu -->
    <div class="relative pt-32 md:pt-40 lg:pt-48 pb-12 z-10">
      <h2 class="relative text-xl font-bold text-center mb-12 w-fit mx-auto">
        <span class="relative z-10 text-2xl md:text-3xl text-white">Nos cinémas partenaires</span>
        <span class="absolute -left-2 -bottom-1 top-2 bg-black z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
      </h2>
      <div class="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-24 gap-y-8 md:gap-y-12 px-4">
        {#each partenaires as partenaire}
          <div class="flex justify-center w-[120px] md:w-[180px] max-w-[220px]">
            <img src={partenaire.src} alt={"Logo de " + partenaire.alt} class="max-w-full max-h-[120px] md:max-h-[180px] filter drop-shadow-lg hover:scale-110 transition-transform duration-300" />
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>

<style>
  /* Masquer la scrollbar tout en gardant la fonctionnalité */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in-right {
    animation: fadeInRight 0.8s ease-out forwards;
    opacity: 0;
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-900 {
    animation-delay: 0.9s;
  }

  /* Fade left/right pour le carrousel */
  .fade-in-right {
    opacity: 1;
    animation: fadeInRightSlide 0.7s forwards;
  }
  .fade-in-left {
    opacity: 1;
    animation: fadeInLeftSlide 0.7s forwards;
  }

  @keyframes fadeInRightSlide {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInLeftSlide {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeOutRightSlide {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-30px); }
  }
  @keyframes fadeOutLeftSlide {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(30px); }
  }
</style>