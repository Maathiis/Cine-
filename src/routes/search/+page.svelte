<script>
	import { page } from '$app/stores';
	import { searchMovieByTitle } from '$lib/api';
	import { goto } from '$app/navigation';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';

	let query = '';
	let movies = [];
	let loading = true;
	let errorMessage = '';
	let currentPage = 1;
	let totalPages = 1;

	$: query = $page.url.searchParams.get('query');
	$: currentPage = Number($page.url.searchParams.get('page') || 1);


	async function fetchMovies() {
		if (!query) return;
		loading = true;
		try {
			const data = await searchMovieByTitle(query, currentPage);
			movies = data.results;
			totalPages = data.total_pages;
			if (movies.length === 0) {
				errorMessage = 'Aucun film trouvé.';
			}
		} catch (error) {
			errorMessage = 'Erreur lors de la recherche.';
			console.error(error);
		} finally {
			loading = false;
		}
	}

	$: if (query && currentPage) fetchMovies();

	function goToPage(page) {
		goto(`/search?query=${encodeURIComponent(query)}&page=${page}`);
	}
</script>

<svelte:head>
	<title>Ciné + - Recherche : {query}</title>
</svelte:head>

<main>
	<h1>Résultats pour "{query}"</h1>

	{#if loading}
		<p>Chargement...</p>
	{:else if errorMessage}
		<p>{errorMessage}</p>
	{:else}
		<ul>
			{#each movies as movie}
				<li>{movie.title} ({movie.release_date})</li>
			{/each}
		</ul>

		{#if totalPages > 1}
			<Pagination
				{currentPage}
				{totalPages}
				onPageChange={goToPage}
			/>
		{/if}

	{/if}
</main>