<script>
    import CarrouselCurrent from "$lib/components/Carrousel/CarrouselCurrent.svelte";
    let filmsError = Array(10).fill({});
    export let error;
    export let data;
    $: currentMovies = data.currentMovies.results;
    let errorCode = error?.status || 404;
  </script>
  
  <main class="min-h-screen bg-black flex flex-col justify-start pt-8 md:pt-12">
    <!-- Écran de cinéma -->
    <section class="w-full flex justify-center items-center mb-8 px-2 md:px-0">
      <div class="relative w-full max-w-full md:max-w-3xl h-[260px] md:h-[420px] bg-gray-300 rounded-2xl border border-gray-400/30 shadow-2xl mx-0 md:mx-24 flex items-center">
        <div class="absolute inset-0 rounded-2xl border-4 border-white/20 pointer-events-none" style="backdrop-filter: blur(8px);"></div>
        <div class="relative z-10 flex flex-col justify-center items-start h-full px-4 md:px-10">
          <h1 class="text-xl md:text-3xl font-bold text-black mb-2">Oups, une erreur est survenue&nbsp;: <span class="font-bold text-[#F51010]">{errorCode}</span></h1>
          <p class="text-base md:text-lg text-gray-700">Nous n'avons pas pu trouver la page ou une erreur s'est produite.<br class="hidden md:block"/> Merci de réessayer ou de revenir à l'accueil.</p>
        </div>
        <img src="/images/image90.png" alt="Erreur" class="h-32 w-32 md:h-100 md:w-100 object-contain ml-auto hidden md:block z-10" />
      </div>
    </section>
  
    <!-- Image sièges -->
    <div class="w-full flex justify-center mb-8 md:mb-12 px-2 md:px-0">
      <img src="/images/siegeError.png" alt="Sièges cinéma" class="w-full max-w-md md:max-w-2xl h-auto block" />
    </div>
  
    <!-- Suggestion -->
    <div class="mb-8 md:mb-10 px-4 md:ml-24">
      <h2 class="text-2xl md:text-5xl text-white font-semibold">Essayez nos films du moment</h2>
    </div>

    <div class="px-2 md:px-0">
      <CarrouselCurrent {currentMovies} number1={0} number2={10} />
    </div>
  </main>



