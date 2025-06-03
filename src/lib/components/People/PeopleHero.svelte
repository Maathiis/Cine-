<script>
    import { formatDateTextFR, getAge } from "$lib/globalFunction";
    export let data;
</script>

<section class="mx-4 md:mx-8 lg:mx-12">
    <div class="container flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
        <div class="w-full lg:w-1/4 max-w-sm mx-auto lg:mx-0 rounded-lg overflow-hidden">
            <img src={`https://image.tmdb.org/t/p/w500${data.actor.profile_path}`} alt={data.actor.name} class="w-full h-full object-cover aspect-[3/4]" />
        </div>
        <div class="flex flex-col w-full lg:w-3/4">
            <h1 class="text-3xl md:text-4xl lg:text-6xl font-bold text-center lg:text-left">{data.actor.name}</h1>
            <div class="mt-4 md:mt-6">
                <h2 class="relative text-xl md:text-2xl lg:text-3xl font-bold w-fit mx-auto lg:mx-0">
                    <span class="relative z-10 text-white">Informations personnelles</span>
                    <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 ml-3 w-full h-2/3 rounded-lg -rotate-3"></span>
                </h2>
                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 mt-3 md:mt-4">
                    <div class="flex flex-col gap-2 md:gap-4 text-center sm:text-left">
                        <span class="text-gray-300 text-sm md:text-base">Date de naissance</span>
                        <span class="text-sm md:text-base">{formatDateTextFR(data.actor.birthday)}</span>
                    </div>
                    <div class="flex flex-col gap-2 md:gap-4 text-center sm:text-left">
                        <span class="text-gray-300 text-sm md:text-base">Âge</span>
                        <span class="text-sm md:text-base">{getAge(data.actor.birthday)} ans</span>
                    </div>
                    <div class="flex flex-col gap-2 md:gap-4 text-center sm:text-left">
                        <span class="text-gray-300 text-sm md:text-base">Lieu de naissance</span>
                        <span class="text-sm md:text-base">{data.actor.place_of_birth || 'Non spécifié'}</span>
                    </div>
                </div>
            </div>

            <div class="mt-4 md:mt-6">
                <h2 class="relative text-xl md:text-2xl lg:text-3xl font-bold w-fit mx-auto lg:mx-0">
                    <span class="relative z-10 text-white">Biographie</span>
                    <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 ml-3 w-full h-2/3 rounded-lg -rotate-3"></span>
                </h2>
                <div class="mt-3 md:mt-4">
                    {#if data.actor.biography}
                        <p class="text-gray-200 text-sm md:text-base leading-relaxed text-justify">{data.actor.biography}</p>
                    {:else}
                    <!-- On va chercher la biographie anglaise -->
                    <p class="text-gray-200 text-sm md:text-base text-center lg:text-left">Aucune biographie disponible</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>