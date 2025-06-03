<script>
    import PeopleHero from "$lib/components/People/PeopleHero.svelte";
    import PeopleFilmo from "$lib/components/People/PeopleFilmo.svelte";
    import PeoplePlay from "$lib/components/People/PeoplePlay.svelte";

    export let data;
    let knownForMovies = data.knownForMovies;
</script>

<main>
    <PeopleHero {data} />

    <div class="my-12">
        <h1 class="relative text-3xl font-bold mb-8 ml-8 mt-4 w-fit">
            <span class="relative z-10 text-white">Célèbre pour</span>
            <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 ml-3 w-full h-2/3 rounded-lg -rotate-3"></span>
        </h1>
        <PeopleFilmo {knownForMovies} />
    </div>

    <PeoplePlay {data} />
</main>