<script>
  let duMoment = Array(10).fill({});
  let aVenir = Array(6).fill({});
  let partenaires = [
    { src: "/images/pathe.png", alt: "Pathé" },
    { src: "/images/UGC.png", alt: "UGC" },
    { src: "/images/Kinepolis.png", alt: "Kinépolis" },
    { src: "/images/Cineville.png", alt: "Cinéville" }
  ];
</script>

<main class="bg-black text-white">
  <!-- Hero en full width -->
  <section class="relative w-screen h-screen overflow-hidden">
    <img src="/images/film1.jpg" alt="Principale" class="object-cover w-full h-full" />
    <!-- Ombres -->
    <div class="absolute top-0 left-0 bottom-0 w-[60px] bg-gradient-to-r from-black/70 to-transparent z-10"></div>
    <div class="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/70 to-transparent z-10"></div>
  </section>

  <!-- Du moment -->
  <section class="mt-8 mb-12">
    <h2 class="text-2xl font-bold pl-12 mb-4">Du moment</h2>
    <div class="flex overflow-x-auto gap-8 scrollbar-hide pl-12 pr-12">
      {#each duMoment as film, i (i)}
        <div class="flex-none w-[320px] h-[440px] bg-gray-800 rounded-2xl shadow-xl">
          <div class="h-4/5 bg-gray-700 rounded-xl mb-2"></div>
          <div class="text-center px-2">
            <span class="block text-red-600 font-bold">{film.date || ''}</span>
            <span class="block text-lg">{film.titre || ''}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- À venir -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold pl-12 mb-4">À venir</h2>
    <div class="flex overflow-x-auto gap-10 scrollbar-hide pl-12 pr-12">
      {#each aVenir as film, i (i)}
        <div class="flex-none w-[420px] h-[600px] bg-gray-800 rounded-2xl shadow-xl">
          <div class="h-4/5 bg-gray-700 rounded-xl mb-2"></div>
          <div class="text-center px-2">
            <span class="block text-red-600 font-bold">{film.date || ''}</span>
            <span class="block text-lg">{film.titre || ''}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Partenaires -->
  <section class="relative mt-16">
    <!-- Courbe SVG -->
    <div class="absolute top-0 left-0 w-full h-20 overflow-hidden">
      <svg class="absolute w-full h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,80 Q720,0 1440,80 L1440,0 L0,0 Z" fill="#F51010"/>
      </svg>
    </div>
    
    <!-- Contenu -->
    <div class="relative bg-[#F51010] pt-20 pb-8 z-10">
      <h2 class="text-xl font-bold text-center mb-8">Nos cinémas partenaires</h2>
      <div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 px-4">
        {#each partenaires as partenaire}
          <div class="flex justify-center w-[180px] max-w-[220px]">
            <img src={partenaire.src} alt={"Logo de " + partenaire.alt} class="max-w-full max-h-[180px] filter drop-shadow-lg" />
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
</style>