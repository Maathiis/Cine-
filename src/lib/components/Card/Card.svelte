<script>
    import { formatDateFR } from "$lib/globalFunction.js";
    export let film;
    export let size = "normal";
  
    $: isLarge = size === "large";
  </script>
  
  <section class="flex flex-col gap-4">
    <a href={`/film/${film.id}`}>
    <div class={`flex-none ${isLarge ? 'w-[420px] h-[600px]' : 'w-[320px] h-[440px]'} bg-gray-800 rounded-2xl shadow-xl`}>
        <div class={`${isLarge ? 'h-full' : 'h-full'} bg-gray-700 rounded-xl mb-2 overflow-hidden`}>
          <img 
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title} 
            class="w-full h-full object-cover"
          />
        </div>
      
        
    </div>
    <div class="text-center px-4 text-white">
        <span class={`block font-semibold ${isLarge ? 'text-2xl' : 'text-lg'}`}>{film.title}</span>
    </div>
    </a>
  </section>
  