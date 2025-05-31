<script>
    export let actor;
    
    // URL de l'image par défaut
    const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23374151'/%3E%3Ctext x='100' y='130' font-family='Arial, sans-serif' font-size='14' fill='%23D1D5DB' text-anchor='middle'%3EPas d'image%3C/text%3E%3Ctext x='100' y='150' font-family='Arial, sans-serif' font-size='14' fill='%23D1D5DB' text-anchor='middle'%3Edisponible%3C/text%3E%3Ccircle cx='100' cy='100' r='25' fill='none' stroke='%23D1D5DB' stroke-width='2'/%3E%3Ccircle cx='92' cy='95' r='3' fill='%23D1D5DB'/%3E%3Ccircle cx='108' cy='95' r='3' fill='%23D1D5DB'/%3E%3Cpath d='M85 110 Q100 120 115 110' stroke='%23D1D5DB' stroke-width='2' fill='none'/%3E%3C/svg%3E";
    
    // Fonction pour obtenir l'URL de l'image
    function getImageUrl(profilePath) {
        if (!profilePath) {
            return defaultImage;
        }
        return `https://image.tmdb.org/t/p/w500${profilePath}`;
    }
</script>

<a
    href={`/people/${actor.id}`}
    class="block w-full max-w-[180px] rounded-[20px] bg-neutral-900 flex-shrink-0 overflow-hidden"
>
    <div class="aspect-[2/3] overflow-hidden rounded-t-[20px]">
        <img 
            class="w-full h-full object-cover" 
            src={getImageUrl(actor.profile_path)} 
            alt={actor.name}
            loading="lazy"
        />
    </div>
    <div class="flex flex-col px-4 py-3">
        <span class="font-semibold text-white truncate text-sm">{actor.name}</span>
        <span class="text-gray-400 truncate text-xs">{actor.character}</span>
    </div>
</a>