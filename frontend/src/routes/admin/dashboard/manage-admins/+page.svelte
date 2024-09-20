<script>
  // @ts-nocheck

  import "../../../../scss/home.css";
  import "../../../../scss/admin.css";
  import { writable } from "svelte/store";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";
  export let data;
  let msg = ''
  //admin is admin's session data
  const { adminData, admin } = data;

  let searchQuery = writable("");
  let error = false;

  // Function to filter the admins based on searchQuery
  $: filteredAdmins = adminData.filter((admin) => {
    return (
      admin.name.toLowerCase().includes($searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes($searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes($searchQuery.toLowerCase()) ||
      admin.granted_by.toLowerCase().includes($searchQuery.toLowerCase())
    );
  });

  async function handleDeleteAdmin(email, role, granted_by) {
    const adminEmail = email;
    const adminRole = role;
    const grantedBy = granted_by;
    console.log("Email log ", adminEmail);
    try {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/admin-delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ adminEmail, adminRole, grantedBy }),
      });
      if (response.ok) {
        const result = await response.json();
        error = result.error;
        msg = result.msg;
        if (!error) {
          window.location.reload(); // Reload the page after successful deletion
        }
        toast.success(msg, {
        position: 'bottom-center'
      })
      } else {
        const result = await response.json();
        error = result.error;
        msg = result.msg;
        toast.error(msg, {
        position: 'bottom-center'
      })
      }
    } catch (err) {
      console.log(err);
      error = true;
      msg = "An unexpected error occurred."
      toast.error(msg, {
        position: 'bottom-center'
      })
    }
  }
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
</script>

<div class="manage-admins-container">
  <div class="manage-admins-top">
    <h3 class="title">Manage Admins</h3>
    <!-- <a href="/admin/dashboard">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
        ><path
          d="M223.3 37.8c.4-1.5 1.3-2.8 2.4-3.8c9.9-1.3 20-2 30.3-2s20.4 .7 30.3 2c1.1 1 1.9 2.3 2.4 3.8l13.7 47.7c3.5 12.1 12.2 21.1 22.5 26.1c7.6 3.6 14.8 7.8 21.7 12.5c9.4 6.5 21.7 9.5 33.9 6.5l48.2-12c1.5-.4 3-.3 4.4 .2c5.4 6.9 10.4 14.2 14.9 21.8l4.3 7.4c4.2 7.5 7.9 15.3 11.2 23.3c-.3 1.5-1 2.9-2.1 4L426.8 211c-8.7 9-12.2 21.1-11.3 32.5c.3 4.1 .5 8.3 .5 12.5s-.2 8.4-.5 12.5c-.9 11.4 2.6 23.5 11.3 32.5l34.5 35.7c1.1 1.1 1.8 2.5 2.1 4c-3.3 8-7 15.8-11.2 23.4l-4.2 7.3c-4.6 7.6-9.6 14.8-14.9 21.8c-1.4 .5-2.9 .5-4.4 .2l-48.2-12c-12.2-3-24.4 0-33.9 6.5c-6.9 4.7-14.1 8.9-21.7 12.5c-10.3 4.9-19.1 14-22.5 26.1l-13.7 47.7c-.4 1.5-1.3 2.8-2.4 3.8c-9.9 1.3-20 2-30.3 2s-20.4-.7-30.3-2c-1.1-1-1.9-2.3-2.4-3.8l-13.7-47.7c-3.5-12.1-12.2-21.1-22.5-26.1c-7.6-3.6-14.8-7.8-21.7-12.5c-9.4-6.5-21.7-9.5-33.9-6.5l-48.2 12c-1.5 .4-3 .3-4.4-.2c-5.4-7-10.4-14.2-15-21.8l-4.2-7.3c-4.2-7.5-7.9-15.3-11.2-23.4c.3-1.5 1-2.9 2.1-4L85.2 301c8.7-9 12.2-21.1 11.3-32.5c-.3-4.1-.5-8.3-.5-12.5s.2-8.4 .5-12.5c.9-11.4-2.6-23.5-11.3-32.5L50.7 175.2c-1.1-1.1-1.8-2.5-2.1-4c3.3-8 7-15.8 11.2-23.4l4.2-7.3c4.6-7.6 9.6-14.8 15-21.8c1.4-.5 2.9-.5 4.4-.2l48.2 12c12.2 3 24.4 0 33.9-6.5c6.9-4.7 14.1-8.9 21.7-12.5c10.3-4.9 19.1-14 22.5-26.1l13.7-47.7zM256 0c-13 0-25.9 1-38.4 2.9c-1.7 .3-3.4 .8-5 1.6c-9.5 4.9-16.9 13.6-20 24.5L178.9 76.7c-.6 2.2-2.5 4.5-5.6 6c-9.1 4.3-17.8 9.4-26 15c-2.8 1.9-5.8 2.4-8 1.8l-48.2-12C80.2 84.8 69 86.9 60 92.6c-1.5 .9-2.8 2.1-3.9 3.5C49 105 42.4 114.3 36.5 124.1l-.1 .3L32 132l-.1 .3c-5.4 9.8-10.2 19.9-14.3 30.4c-.6 1.6-1 3.3-1.1 5c-.5 10.8 3.3 21.6 11.2 29.8l34.5 35.7c1.6 1.7 2.7 4.4 2.4 7.8c-.4 5-.6 10-.6 15s.2 10.1 .6 15c.3 3.4-.8 6.2-2.4 7.8L27.7 314.6c-7.9 8.2-11.7 19-11.2 29.8c.1 1.7 .5 3.4 1.1 5c4.1 10.5 8.9 20.6 14.3 30.4l.1 .3 4.4 7.6 .1 .3c5.9 9.8 12.4 19.2 19.6 28.1c1.1 1.4 2.4 2.6 3.9 3.5c9 5.7 20.2 7.8 31.1 5.1l48.2-12c2.2-.6 5.2-.1 8 1.8c8.2 5.7 16.9 10.7 26 15c3.1 1.5 4.9 3.8 5.6 6L192.6 483c3.1 10.8 10.5 19.5 20 24.5c1.6 .8 3.2 1.4 5 1.6C230.1 511 243 512 256 512s25.9-1 38.4-2.9c1.7-.3 3.4-.8 5-1.6c9.5-4.9 16.9-13.6 20-24.5l13.7-47.7c.6-2.2 2.5-4.5 5.6-6c9.1-4.3 17.8-9.4 26-15c2.8-1.9 5.8-2.4 8-1.8l48.2 12c10.9 2.7 22.1 .7 31.1-5.1c1.5-.9 2.8-2.1 3.9-3.5c7.1-8.9 13.6-18.2 19.5-28l.1-.3L480 380l.1-.3c5.4-9.7 10.2-19.9 14.3-30.4c.6-1.6 1-3.3 1.1-5c.5-10.8-3.3-21.6-11.2-29.8l-34.5-35.7c-1.6-1.7-2.7-4.4-2.4-7.8c.4-5 .6-10 .6-15s-.2-10.1-.6-15c-.3-3.4 .8-6.2 2.4-7.8l34.5-35.7c7.9-8.2 11.7-19 11.2-29.8c-.1-1.7-.5-3.4-1.1-5c-4.1-10.5-8.9-20.6-14.3-30.4l-.1-.3-4.4-7.6-.1-.3c-5.9-9.8-12.4-19.2-19.5-28c-1.1-1.4-2.4-2.6-3.9-3.5c-9-5.7-20.2-7.8-31.1-5.1l-48.2 12c-2.2 .6-5.2 .1-8-1.8c-8.2-5.7-16.9-10.7-26-15c-3.1-1.5-4.9-3.8-5.6-6L319.4 29c-3.1-10.8-10.5-19.5-20-24.5c-1.6-.8-3.2-1.4-5-1.6C281.9 1 269 0 256 0zM200 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm144 0a88 88 0 1 0 -176 0 88 88 0 1 0 176 0z"
        /></svg
      >
      Go to Dashboard</a
    > -->
  </div>

  <div class="admin-table">
    <div class="admin-table-top">
      <input
        type="text"
        placeholder="Search Name, Email, Role and Granted_by"
        bind:value={$searchQuery}
      />

      <a href="/admin/dashboard/manage-admins/new-admin">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
          ><path
            d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"
          /></svg
        >
        New Admin</a
      >
    </div>

    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Granted_by</th>
          <th>Admin since</th>
          <th>Admin till</th>
          <th>Action</th>
        </tr>
        {#each filteredAdmins as admin (admin.email)}
          <tr>
            <td
              ><div class="img-name">
                <div class="pfp-container">
                  <img src={admin.picture} alt="adminPfp" />
                </div>
                {admin.name}
              </div></td
            >
            <td>{admin.email}</td>
            <td>{capitalize(admin.role)}</td>
            <td>{admin.granted_by}</td>
            <td>{admin.valid_from}</td>
            <td>{admin.valid_till}</td>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <td>
              <button
                title="Edit admin"
                on:click={goto(`/admin/dashboard/manage-admins/${admin.email}`)}
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                  ><path
                    d="M395.8 39.6c9.4-9.4 24.6-9.4 33.9 0l42.6 42.6c9.4 9.4 9.4 24.6 0 33.9L417.6 171 341 94.4l54.8-54.8zM318.4 117L395 193.6 159.6 428.9c-7.6 7.6-16.9 13.1-27.2 16.1L39.6 472.4l27.3-92.8c3-10.3 8.6-19.6 16.1-27.2L318.4 117zM452.4 17c-21.9-21.9-57.3-21.9-79.2 0L60.4 329.7c-11.4 11.4-19.7 25.4-24.2 40.8L.7 491.5c-1.7 5.6-.1 11.7 4 15.8s10.2 5.7 15.8 4l121-35.6c15.4-4.5 29.4-12.9 40.8-24.2L495 138.8c21.9-21.9 21.9-57.3 0-79.2L452.4 17z"
                  /></svg
                >
              </button>
              <button
                title="Delete admin"
                on:click={handleDeleteAdmin(
                  admin.email,
                  admin.role,
                  admin.granted_by,
                )}
              >
                <svg class="delete-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                  ><path
                    d="M177.7 32h92.5c5.5 0 10.6 2.8 13.6 7.5L299.1 64H148.9l15.3-24.5c2.9-4.7 8.1-7.5 13.6-7.5zM336.9 64L311 22.6C302.2 8.5 286.8 0 270.3 0H177.7C161.2 0 145.8 8.5 137 22.6L111.1 64H64.1 32 16C7.2 64 0 71.2 0 80s7.2 16 16 16H34.3L59.8 452.6C62.1 486.1 90 512 123.6 512H324.4c33.6 0 61.4-25.9 63.8-59.4L413.7 96H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H416 383.9 336.9zm44.8 32L356.3 450.3C355.1 467 341.2 480 324.4 480H123.6c-16.8 0-30.7-13-31.9-29.7L66.4 96H381.6z"
                  /></svg
                >
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
