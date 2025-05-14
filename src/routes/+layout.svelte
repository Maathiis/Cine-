<script>
	import '../app.css';
    import Header from "$lib/components/Header/Header.svelte";
	import Footer1 from '$lib/components/Footer/Footer1.svelte';
	import Footer2 from '$lib/components/Footer/Footer2.svelte';
	let { children } = $props();

</script>
<Header/>

<main>
	{@render children()}
</main>

<Footer1/>