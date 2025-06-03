<script>
  export let data;
  $: currentMovies = data.currentMovies.results;

  
  import Card from "$lib/components/Card/Card.svelte";
  import CarrouselCurrent from "$lib/components/Carrousel/CarrouselCurrent.svelte";
  import { getScoreColor, convertScore } from "$lib/globalFunction.js";

</script>

<main class="bg-black min-h-screen text-white pb-16">
  <!-- Titre Top 3 -->
  <h2 class="relative text-xl font-bold w-fit mb-6 ml-2">
    <span class="relative z-10 text-white">Top 3 film du moment</span>
    <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
  </h2>

  <!-- PODIUM SVG (desktop/tablette uniquement) -->
  <div class="relative w-full justify-center items-end hidden md:flex" style="height:clamp(700px,44vw,520px);">

    <a href={`/film/${currentMovies[0].id}`}>
      <div class="absolute top-10 left-[43%]  w-[190px] h-[270px]">
        <div class="absolute inset-0 rounded-lg bg-white blur-2xl opacity-30 z-0"></div>
        <img src={`https://image.tmdb.org/t/p/w500${currentMovies[0].poster_path}`} alt={currentMovies[0].title} class="w-full h-full object-cover relative z-10 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
      </div>
    </a>

    <a href={`/film/${currentMovies[1].id}`}>
      <div class="absolute top-40 left-[26%] w-[190px] h-[270px]">
        <div class="absolute inset-0 rounded-lg bg-white blur-2xl opacity-30 z-0"></div>
        <img src={`https://image.tmdb.org/t/p/w500${currentMovies[1].poster_path}`} alt={currentMovies[1].title} class="w-full h-full object-cover relative z-10 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
      </div>
    </a>

    <a href={`/film/${currentMovies[2].id}`}>
      <div class="absolute top-55 left-[61%] w-[190px] h-[270px]">
        <div class="absolute inset-0 rounded-lg bg-white blur-2xl opacity-40 z-0"></div>
        <img src={`https://image.tmdb.org/t/p/w500${currentMovies[2].poster_path}`} alt={currentMovies[2].title} class="w-full h-full object-cover relative z-10 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
      </div>
    </a>
    

    <!-- SVG podium inline -->
    <svg viewBox="50 -180 1100 500" fill="none" xmlns="http://www.w3.org/2000/svg"s
      class="w-[95vw] max-w-[900px] h-full block">
      <g filter="url(#filter0_d_8_4368)">
        <path d="M1050.1 224L1100 265H760V224H1050.1Z" fill="url(#paint0_linear_8_4368)"/>
        <path d="M760 264H1100V520H760V264Z" fill="url(#paint1_linear_8_4368)"/>
        <path d="M760 264H1100V520H760V264Z" fill="url(#paint2_linear_8_4368)" fill-opacity="0.7"/>
        <g filter="url(#filter1_i_8_4368)">
        <path d="M926.263 421.5C920.179 421.5 914.138 420.708 908.138 419.125C902.138 417.458 897.054 415.125 892.888 412.125L900.763 396.625C904.096 399.042 907.971 400.958 912.388 402.375C916.804 403.792 921.263 404.5 925.763 404.5C930.846 404.5 934.846 403.5 937.763 401.5C940.679 399.5 942.138 396.75 942.138 393.25C942.138 389.917 940.846 387.292 938.263 385.375C935.679 383.458 931.513 382.5 925.763 382.5H916.513V369.125L940.888 341.5L943.138 348.75H897.263V332.5H958.513V345.625L934.263 373.25L924.013 367.375H929.888C940.638 367.375 948.763 369.792 954.263 374.625C959.763 379.458 962.513 385.667 962.513 393.25C962.513 398.167 961.221 402.792 958.638 407.125C956.054 411.375 952.096 414.833 946.763 417.5C941.429 420.167 934.596 421.5 926.263 421.5Z" fill="#89471E"/>
        </g>
        <path d="M143.364 144L80 184.464H422.181V144.002L143.364 144Z" fill="url(#paint3_linear_8_4368)"/>
        <path d="M80 184H420V520H80V184Z" fill="url(#paint4_linear_8_4368)"/>
        <path d="M80 184H420V520H80V184Z" fill="url(#paint5_linear_8_4368)" fill-opacity="0.7"/>
        <g filter="url(#filter2_i_8_4368)">
        <path d="M211.212 367V351.25L251.712 313C254.912 310.1 257.262 307.5 258.762 305.2C260.262 302.9 261.262 300.8 261.762 298.9C262.362 297 262.662 295.25 262.662 293.65C262.662 289.45 261.212 286.25 258.312 284.05C255.512 281.75 251.362 280.6 245.862 280.6C241.462 280.6 237.362 281.45 233.562 283.15C229.862 284.85 226.712 287.5 224.112 291.1L206.412 279.7C210.412 273.7 216.012 268.95 223.212 265.45C230.412 261.95 238.712 260.2 248.112 260.2C255.912 260.2 262.712 261.5 268.512 264.1C274.412 266.6 278.962 270.15 282.162 274.75C285.462 279.35 287.112 284.85 287.112 291.25C287.112 294.65 286.662 298.05 285.762 301.45C284.962 304.75 283.262 308.25 280.662 311.95C278.162 315.65 274.462 319.8 269.562 324.4L235.962 356.05L231.312 347.2H290.562V367H211.212Z" fill="#797979"/>
        </g>
        <path d="M452 0H732L760 36H420L452 0Z" fill="url(#paint6_linear_8_4368)"/>
        <rect x="420" y="36" width="340" height="484" fill="url(#paint7_linear_8_4368)"/>
        <rect x="420" y="36" width="340" height="484" fill="url(#paint8_linear_8_4368)" fill-opacity="0.7"/>
        <g filter="url(#filter3_i_8_4368)">
        <path d="M580.74 241V113L594.74 127H552.74V101H613.14V241H580.74Z" fill="#996E2A"/>
        </g>
        </g>
        <defs>
        <filter id="filter0_d_8_4368" x="0" y="0" width="1180" height="700" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="100"/>
        <feGaussianBlur stdDeviation="40"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.47451 0 0 0 0 0.376471 0 0 0 0 0.211765 0 0 0 0.07 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_4368"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_4368" result="shape"/>
        </filter>
        <filter id="filter1_i_8_4368" x="892.888" y="332.5" width="69.625" height="89" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="8"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_8_4368"/>
        </filter>
        <filter id="filter2_i_8_4368" x="206.412" y="260.2" width="84.1494" height="106.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="10"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_8_4368"/>
        </filter>
        <filter id="filter3_i_8_4368" x="552.74" y="101" width="60.3994" height="140" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="14"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_8_4368"/>
        </filter>
        <linearGradient id="paint0_linear_8_4368" x1="929.058" y1="263.008" x2="929.058" y2="224" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9D562B"/>
        <stop offset="1" stop-color="#B86D3F"/>
        </linearGradient>
        <linearGradient id="paint1_linear_8_4368" x1="929.798" y1="519.494" x2="929.798" y2="263.62" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6D3A1A"/>
        <stop offset="1" stop-color="#B86D3F"/>
        </linearGradient>
        <linearGradient id="paint2_linear_8_4368" x1="930" y1="264" x2="930" y2="520" gradientUnits="userSpaceOnUse">
        <stop stop-opacity="0"/>
        <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint3_linear_8_4368" x1="264.871" y1="183.709" x2="264.871" y2="144" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7C7C7C"/>
        <stop offset="1" stop-color="#B1B1B1"/>
        </linearGradient>
        <linearGradient id="paint4_linear_8_4368" x1="249.798" y1="519.336" x2="249.798" y2="183.501" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7C7C7C"/>
        <stop offset="1" stop-color="#B1B1B1"/>
        </linearGradient>
        <linearGradient id="paint5_linear_8_4368" x1="250" y1="184" x2="250" y2="520" gradientUnits="userSpaceOnUse">
        <stop stop-opacity="0"/>
        <stop offset="0.9375" stop-opacity="0.9375"/>
        <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint6_linear_8_4368" x1="604.871" y1="36" x2="604.871" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9D6E2B"/>
        <stop offset="1" stop-color="#B88A3F"/>
        </linearGradient>
        <linearGradient id="paint7_linear_8_4368" x1="589.798" y1="519.044" x2="589.798" y2="35.2811" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6D4B1A"/>
        <stop offset="1" stop-color="#B88A3F"/>
        </linearGradient>
        <linearGradient id="paint8_linear_8_4368" x1="590" y1="36" x2="590" y2="520" gradientUnits="userSpaceOnUse">
        <stop stop-opacity="0"/>
        <stop offset="1"/>
        </linearGradient>
        </defs>
    </svg>

  </div>

  <!-- Version mobile du Top 3 -->
  <div class="flex flex-col gap-6 md:hidden px-4 mb-8">
    {#each currentMovies.slice(0, 3) as film}
      <a href={`/film/${film.id}`} class="flex gap-4 items-center bg-neutral-900 rounded-xl shadow-lg p-3">
        <img
          src={`https://image.tmdb.org/t/p/w185${film.poster_path}`}
          alt={film.title}
          class="w-20 h-28 object-cover rounded-lg flex-shrink-0"
        />
        <div class="flex flex-col justify-center flex-1">
          <h3 class="text-lg font-semibold text-white mb-1">{film.title}</h3>
          <span class="text-sm text-gray-400">{getScoreColor ? convertScore(film.vote_average) + '/100' : ''}</span>
        </div>
      </a>
    {/each}
  </div>

  <!-- Titre Top 10 -->
  <h2 class="relative text-xl font-bold w-fit mt-10 mb-6 ml-2">
    <span class="relative z-10 text-white">Top 10 film du moment</span>
    <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
  </h2>

  <div class="overflow-x-auto scrollbar-hide p-4">
    <div
      class="flex gap-20 "
      style="width:100%; min-width:2100px;"
      
    >
      {#each currentMovies.slice(3, 10) as film, i}
      <a href={`/film/${film.id}`}>
        <div
        class="flex flex-col items-center flex-none relative "
        style="width:clamp(260px,18vw,270px);"
      >
        <div class="flex items-center w-full">
          <span class="text-white font-extrabold mr-24 text-[clamp(200px,18vw,300px)] leading-none min-w-0" style="line-height:1;">{i+4}</span>
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title}
            class="w-full h-[42vw] max-h-[330px] min-h-[210px] rounded-3xl shadow-xl object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      </a>
        
      {/each}
      <!-- Pour l'effet 7,5 affiches visibles, on ajoute un espace à droite -->
      <div class="flex-none" style="width:clamp(130px,12vw,180px)"></div>
    </div>
  </div>

  <!-- Titre Film du moment -->
  <h2 class="relative text-xl font-bold w-fit mb-6 ml-2 mt-10">
    <span class="relative z-10 text-white">Film du moment</span>
    <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-3"></span>
  </h2>

  <CarrouselCurrent {currentMovies} number1={10} number2={20} />

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
