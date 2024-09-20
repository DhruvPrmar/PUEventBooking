<script>
	import Header from "$lib/components/Header.svelte";
	export let data;
	// console.log("Data in layout.svelte: ", data)
</script>

<svelte:head>
    <title>Movies & Events in PU</title>
</svelte:head>


<div class="app">
	<Header/>
	<main>
		<slot {data}/>
	</main>
</div>

