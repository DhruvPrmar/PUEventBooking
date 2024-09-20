<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import AdminHeader from "./AdminHeader.svelte";
  import { derived } from "svelte/store";
  import "../../scss/dashboard.css";
  import toast from "svelte-french-toast";

  // Reactive store to get the current pathname
  const currentPath = derived(page, ($page) => $page.url.pathname);

  let msg = "";
  export let data;
  // console.log("sidebar.svelte data: ", data)
  //Logout
  async function handleAdminLogout() {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/adminLogout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      toast.success("Logged out as admin successfully", {position: "bottom-center"});
      goto("/");
    } else {
      msg = "Error in loging out.Contact Support";
    }
  }
  //logout

  let isOpen = false;

  function toggleSidebar() {
    isOpen = !isOpen;
  }
</script>

<div
  class="sidebar-container"
  class:open={isOpen}
  role="button"
  aria-expanded={isOpen}
  aria-controls="sidebar-content"
  tabindex="0"
  on:click={toggleSidebar}
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleSidebar();
    }
  }}
>
  <AdminHeader {data} />
  <nav>
    <ul>
      <li class={$currentPath === "/admin/dashboard" ? "active" : ""}>
        <a href="/admin/dashboard">Manage Events</a>
      </li>
      <li
        class={$currentPath === "/admin/dashboard/createbanner" ? "active" : ""}
      >
        <a href="/admin/dashboard/createbanner">Create Banner </a>
      </li>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <li class={$currentPath === "#" ? "active" : ""}>
        <a href="#">Notifications</a>
      </li>
      {#if data?.adminData?.role === "developer" || data?.adminData?.role === "master"}
        <li
          class={$currentPath === "/admin/dashboard/manage-admins"
            ? "active"
            : ""}
        >
          <a href="/admin/dashboard/manage-admins">Manage Admins</a>
        </li>
      {/if}
    </ul>
  </nav>

  <button on:click={handleAdminLogout}>Log out</button>
  <p>{msg}</p>
</div>

<style>
  .sidebar-container {
    padding: 1rem;
  }
  .sidebar-container.open {
    left: 0;
  }
  .sidebar-container.open::after {
    transform: rotate(180deg);
    border-radius: 50% 0 0 50%;
  }
</style>
