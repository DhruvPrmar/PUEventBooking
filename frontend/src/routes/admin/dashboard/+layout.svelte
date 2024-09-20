<script>
    export let data;
</script>

<svelte:head>
    <title>Admin Dashboard</title>
</svelte:head>

    <div class="app">
        <main>
            <slot {data}/>
        </main>
    </div>