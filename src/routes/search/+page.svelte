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

<main class="min-h-screen bg-black text-white">
	<div class="container mx-auto px-6 py-8">
		<!-- En-tête de recherche -->
		<div class="mb-8">
			<h1 class="text-2xl md:text-3xl font-bold mb-2">Résultats pour "{query}"</h1>
			{#if !loading && movies.length > 0}
			{console.log(movies)}
				<p class="text-gray-400">
					{movies.length} résultat{movies.length > 1 ? 's' : ''} trouvé{movies.length > 1 ? 's' : ''}
				</p>
			{/if}
		</div>

		{#if loading}
			<div class="flex justify-center items-center py-20">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F51010]"></div>
			</div>
		{:else if errorMessage}
			<div class="text-center py-20">
				<div class="text-6xl mb-4">🎬</div>
				<p class="text-xl text-gray-400">{errorMessage}</p>
			</div>
		{:else}
			<!-- Grille de films -->
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
				{#each movies as movie}
				<a href={`/film/${movie.id}`}>
					<div class="movie-card">
						<!-- Conteneur de l'affiche avec bordure rouge pour debug -->
						<div class="image-container">
							{#if movie.poster_path}
								<img 
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									class="movie-image"
									loading="lazy"
									on:load={() => console.log('Image chargée:', movie.title)}
									on:error={() => console.log('Erreur image:', movie.title)}
								/>
							{:else}
								<div class="no-image">
									<div class="text-center text-gray-500">
										<svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
										</svg>
										<p class="text-xs">Pas d'image</p>
									</div>
								</div>
							{/if}
							
							<!-- Score sur l'affiche -->
							{#if movie.vote_average > 0}
								<div class="score-badge">
									<span class="text-xs font-bold text-white">
										{Math.round(movie.vote_average * 10)}%
									</span>
								</div>
							{/if}
						</div>
						
						<!-- Titre du film -->
						<h3 class="movie-title">
							{movie.title}
						</h3>
						
						<!-- Date de sortie -->
						{#if movie.release_date}
							<p class="movie-year">
								{new Date(movie.release_date).getFullYear()}
							</p>
						{/if}
					</div>
				</a>
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="flex justify-center">
					<Pagination
						{currentPage}
						{totalPages}
						onPageChange={goToPage}
					/>
				</div>
			{/if}
		{/if}
	</div>
</main>

<style>
	.movie-card {
		cursor: pointer;
		transition: transform 0.3s ease;
	}
	
	.movie-card:hover {
		transform: scale(1.05);
	}
	
	.image-container {
		position: relative;
		width: 100%;
		height: 320px;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin-bottom: 12px;
	}
	
	.movie-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block; /* Force l'affichage */
	}
	
	.no-image {
		width: 100%;
		height: 100%;
		background-color: #374151;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.score-badge {
		position: absolute;
		top: 8px;
		right: 8px;
		background-color: rgba(0, 0, 0, 0.75);
		border-radius: 9999px;
		padding: 4px 8px;
	}
	
	.movie-title {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		color: white;
		transition: color 0.3s ease;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.movie-card:hover .movie-title {
		color: #F51010;
	}
	
	.movie-year {
		font-size: 0.75rem;
		color: #9CA3AF;
		margin-top: 4px;
	}
</style>