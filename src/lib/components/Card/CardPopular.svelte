<script>
    export let title = "Cleaner";
    export let duration = "1h49";
    export let genres = ["Action", "Thriller"];
    export let score = 68;
    export let date = "19/02/2025";
    export let actors = "Daisy Ridley, Clive Owen, Taz Skylar";
    export let director = "Martin Campbell";
    export let synopsis = "Lors d'un gala d'entreprise très médiatisé, un groupe de terroristes lourdement armés prend le contrôle de 300 otages. À leur insu, une laveuse de vitres solitaire est témoin du crime en cours et, en fin de compte, c'est une ancienne soldat, douée pour le combat au corps à corps et les armes à feu.";
    export let image = "/images/cleaner.jpg";
</script>

<div class="bg-[#191919] rounded-[32px] flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 items-center w-full max-w-2xl mx-auto">
  <!-- Affiche -->
  <img src={image} alt={title} class="w-[120px] h-[170px] object-cover rounded-[20px] shadow-md" />

  <!-- Infos -->
  <div class="flex-1 flex flex-col gap-1 text-white">
    <div class="flex items-start justify-between w-full">
      <h1 class="text-xl font-bold">{title}</h1>
      <span class="text-base text-gray-400 font-semibold">{date}</span>
    </div>
    <div class="flex items-center gap-2 mt-1 mb-2">
      <span class="text-gray-300 text-sm">{duration}</span>
      {#each genres as genre}
        <span class="bg-[#232323] text-gray-200 rounded-full px-2 py-0.5 text-xs font-medium">{genre}</span>
      {/each}
    </div>
    <div class="flex items-center gap-4 mb-2 flex-col md:flex-row md:items-center">
        <!-- Score circulaire + texte à droite (plus gros) -->
        <div class="flex items-center gap-4 min-w-[140px]">
          <div class="relative flex items-center justify-center w-16 h-16">
            <svg width="64" height="64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#444" stroke-width="6"/>
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke="#D6FF4B"
                stroke-width="6"
                stroke-dasharray="176"
                stroke-dashoffset={176 - (176 * score / 100)}
                stroke-linecap="round"
                style="transition: stroke-dashoffset 0.5s;"
              />
            </svg>
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-white">{score}%</span>
          </div>
          <span class="text-base text-white font-medium leading-tight">Score<br />d'évaluation</span>
        </div>
        <!-- Section Avec / Réalisé par, encore plus à droite sur desktop -->
        <div class="flex flex-row md:flex-col gap-2 md:gap-1 w-full md:w-auto justify-center md:ml-auto mt-2 md:mt-0">
          <div>
            <span class="inline-block bg-[#F51010] text-white font-bold px-1.5 py-0.5 rounded -rotate-3 mb-0.5 text-xs">Avec</span>
            <div class="text-gray-200 text-xs">{actors}</div>
          </div>
          <div>
            <span class="inline-block bg-[#F51010] text-white font-bold px-1.5 py-0.5 rounded -rotate-3 mb-0.5 text-xs">Réalisé par</span>
            <div class="text-gray-200 text-xs">{director}</div>
          </div>
        </div>
      </div>
    <!-- Synopsis -->
    <div>
      <span class="inline-block bg-[#F51010] text-white font-bold px-1.5 py-0.5 rounded -rotate-3 mb-0.5 text-xs">Synopsis</span>
      <p class="text-gray-200 mt-1 text-xs">{synopsis}</p>
    </div>
  </div>
</div>