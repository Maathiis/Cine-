<script>
    import CarrouselCurrent from "$lib/components/Carrousel/CarrouselCurrent.svelte";
    let filmsError = Array(10).fill({});
    export let error;
    export let data;
    $: currentMovies = data.currentMovies.results;
    $: console.log(currentMovies);
    let errorCode = error?.status || 404;
  </script>
  
  <main class="min-h-screen bg-black flex flex-col justify-start pt-12">
    <!-- Écran de cinéma -->
    <section class="w-full flex justify-center items-center mb-8">
      <div class="relative w-full max-w-full h-[420px] bg-gray-300 rounded-2xl border border-gray-400/30 shadow-2xl mx-24  flex items-center"
           style="box-shadow: 0 0 60px 10px #fff3, 0 0 0 8px #fff1 inset;">
        <div class="absolute inset-0 rounded-2xl border-4 border-white/20 pointer-events-none" style="backdrop-filter: blur(8px);"></div>
        <div class="relative z-10 flex flex-col justify-center items-start h-full">
          <h1 class="text-2xl md:text-3xl font-bold text-black mb-2">Oups, une erreur est survenue</h1>
          <p class="text-lg text-gray-200">Erreur <span class="font-bold text-[#F51010]">{errorCode}</span></p>
        </div>
        <img src="/images/image90.png" alt="Erreur" class="h-100 w-100 object-contain ml-auto hidden md:block z-10" />
      </div>
    </section>
  
    <!-- Image sièges -->
    <div class="w-full flex justify-center mb-12">
      <img src="/images/siegeError.png" alt="Sièges cinéma" class="w-full h-full block" />
    </div>
  
    <!-- Suggestion -->
    <div class="mb-10 ml-24">
      <h2 class="text-5xl text-white font-semibold">Essayer nos films du moment</h2>
    </div>

    <CarrouselCurrent {currentMovies} number1={0} number2={10} />
  </main>



