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
  
    <!-- PODIUM SVG -->
    <div class="relative flex justify-center items-end mb-10 w-full" style="height:clamp(300px,44vw,520px)">
      <img
        src="/images/podium.svg"
        alt="Podium SVG"
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95vw] max-w-[900px] z-0"
        draggable="false"
      />
      <!-- 2ème place -->
      <div class="absolute z-10"
        style="
          left:28%; 
          bottom:38%;
          transform:translateX(-50%); width:clamp(90px,13vw,140px);">
        <img src={top3[1].img} alt={top3[1].titre}
          class="w-full h-auto max-h-[120px] rounded-3xl shadow-2xl object-cover mb-1"
        />
        <span class="block text-xs md:text-base font-bold text-center mt-1">{top3[1].titre}</span>
      </div>
      <!-- 1ère place -->
      <div class="absolute z-10"
        style="
          left:50%; 
          bottom:54%;
          transform:translateX(-50%); width:clamp(110px,15vw,170px);">
        <img src={top3[0].img} alt={top3[0].titre}
          class="w-full h-auto max-h-[150px] rounded-3xl shadow-2xl object-cover mb-1"
        />
        <span class="block text-xs md:text-base font-bold text-center mt-1">{top3[0].titre}</span>
      </div>
      <!-- 3ème place -->
      <div class="absolute z-10"
        style="
          left:72%; 
          bottom:25%;
          transform:translateX(-50%); width:clamp(90px,13vw,140px);">
        <img src={top3[2].img} alt={top3[2].titre}
          class="w-full h-auto max-h-[120px] rounded-3xl shadow-2xl object-cover mb-1"
        />
        <span class="block text-xs md:text-base font-bold text-center mt-1">{top3[2].titre}</span>
      </div>
    </div>
  
    <!-- TOP 10 CARROUSEL (affiches -25%, numéros très grands) -->
    <div class="overflow-x-auto scrollbar-hide pl-4 pr-4 -mx-2">
      <div
        class="flex gap-16"
        style="width:100%; min-width:1050px;"
      >
        {#each top10 as film, i}
          <div
            class="flex flex-col items-center flex-none relative"
            style="width:clamp(130px,9vw,135px);"
          >
            <div class="flex items-center w-full">
              <span class="text-white font-extrabold mr-4 text-[clamp(120px,12vw,180px)] leading-none min-w-0" style="line-height:1;">{i+4}</span>
              <img
                src={film.img}
                alt={film.titre}
                class="w-full h-[21vw] max-h-[165px] min-h-[105px] rounded-3xl shadow-xl object-cover"
              />
            </div>
            <span class="block text-xs md:text-base font-bold text-center mt-2">{film.titre}</span>
          </div>
        {/each}
        <!-- Pour l'effet 7,5 affiches visibles, on ajoute un espace à droite -->
        <div class="flex-none" style="width:clamp(65px,6vw,90px)"></div>
      </div>
    </div>
  
    <!-- Grille des films du moment Responsive (affiches *2) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 px-4">
      {#each films as film}
        <div class="flex flex-col items-center">
          <img src={film.img} alt={film.titre} class="w-full max-w-[240px] h-auto aspect-[7/10] rounded-3xl shadow-xl object-cover mb-2" />
          <span class="text-center text-base md:text-lg font-semibold">{film.titre}</span>
        </div>
      {/each}
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