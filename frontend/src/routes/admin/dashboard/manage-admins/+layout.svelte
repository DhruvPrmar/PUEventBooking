<script>
	export let data;
	console.log("manage-admin +layout.svelte data: ", data)
    import Sidebar from "$lib/components/Sidebar.svelte";
</script>
<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<div class="app">
	<main>
		<Sidebar {data} />
		<slot />
	</main>
</div>