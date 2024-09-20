<script>
    import Sidebar from "$lib/components/Sidebar.svelte";
    import "../../../../scss/home.css";
    import "../../../../scss/dashboard.css";
    export let data;
</script>

<div class="dashboard-container">
    <Sidebar {data}/>
    <div class="dashboard-main">
        Create Banner
    </div>
</div>