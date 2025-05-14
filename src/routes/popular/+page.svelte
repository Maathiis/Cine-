<script>
    import CardPopular from "$lib/components/Card/CardPopular.svelte";
    // Simule 40 films populaires
    let populars = Array(40).fill({});
    let visibleCount = 8;
  
    function showMore() {
      visibleCount = Math.min(visibleCount + 8, populars.length);
    }
  </script>
  
  <div class="px-12 py-8 min-h-screen bg-black">
    <!-- Titre avec fond rouge penché -->
    <h1 class="relative text-3xl font-bold mb-12 ml-8 mt-4 w-fit">
      <span class="relative z-10 text-white">Les films populaires</span>
      <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
    </h1>
  
    <!-- Grille de cards 2 par ligne -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      {#each populars.slice(0, visibleCount) as film, i (i)}
        <CardPopular />
      {/each}
    </div>
  
    <!-- Bouton afficher davantage -->
    {#if visibleCount < populars.length}
      <div class="flex justify-center mt-12">
        <button
          class="text-white font-bold px-8 py-3 rounded-full text-4xl shadow-lg hover:text-[#c40d0d] transition"
          on:click={showMore}
        >
          Afficher davantage
        </button>
      </div>
    {/if}
  </div>