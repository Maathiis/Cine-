<script>
	export let currentPage = 1;
	export let totalPages = 1;
	export let onPageChange;

	let pagesToShow = [];
	$: {
		const pages = [];
		const maxButtons = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
		let endPage = Math.min(totalPages, startPage + maxButtons - 1);

		if (endPage - startPage < maxButtons - 1) {
			startPage = Math.max(1, endPage - maxButtons + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		pagesToShow = pages;
	}

	function changePage(pageNum) {
		if (pageNum !== currentPage && pageNum >= 1 && pageNum <= totalPages) {
			onPageChange(pageNum);
		}
	}
</script>

<div class="pagination">
	<button on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}>⬅️</button>

	{#each pagesToShow as pageNum}
		<button
			class:active={pageNum === currentPage}
			on:click={() => changePage(pageNum)}>
			{pageNum}
		</button>
	{/each}

	<button on:click={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>➡️</button>
</div>

<style>
    .pagination {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
    }

    button {
        padding: 0.4rem 0.8rem;
        font-size: 1rem;
        background: #444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button.active {
        background: #F51010;
        color: white;
        font-weight: bold;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>