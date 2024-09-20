<script>
	// @ts-nocheck
	import "../../scss/header.css";
	import "../../scss/home.css";
	import "../../scss/ads.css";
	import "../../scss/movies.css";

	import Ads from "$lib/components/Ads.svelte";
	import Events from "$lib/components/Events.svelte";
	import Movies from "$lib/components/Movies.svelte";

	export let data;
	const { upcommingEvents, upcommingMovies } = data;
</script>

<section class="ads">
	 <Ads /> 
</section>

<section class="events">
	{#if upcommingMovies.length > 0}
		<Movies data={upcommingMovies} />
	{/if}
	{#if upcommingEvents.length > 0}
		<Events data={upcommingEvents} />
	{/if}
</section>
