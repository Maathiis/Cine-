<script>
    let filmsError = Array(10).fill({});
    export let error;
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
        <img src="/images/image90.png" alt="Erreur" class="h-40 w-40 object-contain ml-auto hidden md:block z-10" />
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
  
    <!-- Carrousel de films -->
    <div class="w-full overflow-x-auto scrollbar-hide">
      <div class="flex gap-8 pb-8">
        {#each filmsError as film, i (i)}
          <div class="flex-none w-[220px] h-[320px] bg-gray-800 rounded-2xl shadow-xl
            {i === 0 ? 'ml-24' : ''} {i === filmsError.length - 1 ? 'mr-24' : ''}">
            <div class="h-4/5 bg-gray-700 rounded-xl mb-2"></div>
            <div class="text-center px-2">
              <span class="block text-red-600 font-bold">Titre du film</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </main>
  
  <style>
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  </style>