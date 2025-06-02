<script>
    export let title = "Cleaner";
    export let duration = "1h49";
    export let genres = ["Action", "Thriller"];
    export let score = 68;
    export let date = "19/02/2025";
    export let casts = "Daisy Ridley, Clive Owen, Taz Skylar";
    export let crew = "Martin Campbell";
    export let synopsis = "Lors d'un gala d'entreprise très médiatisé, un groupe de terroristes lourdement armés prend le contrôle de 300 otages. À leur insu, une laveuse de vitres solitaire est témoin du crime en cours et, en fin de compte, c'est une ancienne soldat, douée pour le combat au corps à corps et les armes à feu.";
    export let image = "/images/cleaner.jpg";
    import { transformMinutesToHours, convertScore, formatDateFR, getScoreColor } from "$lib/globalFunction.js";
    

    function getDirector(crew) {
      if (!Array.isArray(crew)) return "Unknown";

      const director = crew.find(
        person =>
          person.known_for_department === "Directing" &&
          person.job === "Director"
      );

      return director ? director.name : "Unknown";
    }
</script>

<div class="bg-[#191919] rounded-[32px] flex flex-col md:flex-row p-6 md:p-8 gap-5 md:gap-7 w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl  transition-transform duration-300 hover:scale-105">
    <!-- Affiche -->
    <div class="relative w-full md:w-[180px] h-[250px] md:h-[320px] flex-shrink-0">
        <img 
            src={image} 
            alt={title} 
            class="w-full h-full object-cover rounded-[20px]"
        />
    </div>

    <!-- Infos -->
    <div class="flex-1 flex flex-col gap-4 text-white">
        <!-- En-tête avec titre et date -->
        <div class="flex items-start justify-between w-full">
            <h1 class="text-xl md:text-2xl font-bold leading-tight">{title}</h1>
            <span class="text-sm text-gray-400 font-semibold ml-4">{formatDateFR(date)}</span>
        </div>

        <!-- Durée et genres -->
        <div class="flex flex-wrap items-center gap-2">
            <span class="text-gray-300 text-xs bg-[#232323] px-2 py-0.5 rounded-full">{transformMinutesToHours(duration)}</span>
            {#each genres as genre}
                <span class="bg-[#232323] text-gray-200 rounded-full px-2 py-0.5 text-xs font-medium">{genre.name}</span>
            {/each}
        </div>

        <!-- Score et équipe -->
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <!-- Score circulaire -->
            <div class="flex items-center gap-3">
                <div class="relative flex items-center justify-center w-16 h-16">
                    <svg width="64" height="64" class="transform -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#444" stroke-width="4"/>
                        <circle
                            cx="32" cy="32" r="28"
                            fill="none"
                            stroke={getScoreColor(convertScore(score))}
                            stroke-width="4"
                            stroke-dasharray="176"
                            stroke-dashoffset={176 - (176 * convertScore(score) / 100)}
                            stroke-linecap="round"
                            style="transition: stroke-dashoffset 0.5s;"
                        />
                    </svg>
                    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-white">{convertScore(score)}%</span>
                </div>
                <span class="text-sm text-white font-medium">Score d'évaluation</span>
            </div>

            <!-- Équipe -->
            <div class="flex flex-col gap-2 md:ml-auto">
                <div>
                    <span class="inline-block bg-[#F51010] text-white font-bold px-1.5 py-0.5 rounded -rotate-3 mb-0.5 text-xs">Avec</span>
                    <div class="text-gray-200 text-xs line-clamp-2">{casts.slice(0, 3).map(actor => actor.name).join(", ")}</div>
                </div>
                <div>
                    <span class="inline-block bg-[#F51010] text-white font-bold px-1.5 py-0.5 rounded -rotate-3 mb-0.5 text-xs">Réalisé par</span>
                    <div class="text-gray-200 text-xs line-clamp-1">{getDirector(crew)}</div>
                </div>
            </div>
        </div>

        <!-- Synopsis -->
        <div>
            <span class="inline-block bg-[#F51010] text-white font-bold px-1.5 py-0.5 rounded -rotate-3 mb-1 text-xs">Synopsis</span>
            <p class="text-gray-200 text-xs line-clamp-4">{synopsis}</p>
        </div>
    </div>
</div>