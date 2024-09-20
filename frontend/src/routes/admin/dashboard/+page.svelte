<script>
    // @ts-nocheck
    import "../../../scss/home.css";
    import "../../../scss/dashboard.css";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import DashboardEvent from "$lib/components/DashboardEvent.svelte";
    import AdminHeader from "$lib/components/AdminHeader.svelte";
    export let data;
    // console.log("Dashboard +page.svelte data: ", data)
</script>

<div class="dashboard-container">
    <Sidebar {data} />
    <div class="dashboard-main">
        <!-- <AdminHeader {data}/> -->
        <div class="dashboard-main-top">
            <h3 class="title">Manage Events</h3>
            <a href="/admin/dashboard/create-event">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                    ><path
                        d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"
                    /></svg
                >
                Create event</a
            >
        </div>
        <div class="event-list">
            <DashboardEvent {data} />
        </div>
    </div>
</div>
