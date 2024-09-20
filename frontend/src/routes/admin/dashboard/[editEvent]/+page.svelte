<script>
  // @ts-nocheck
  import "../../../../scss/home.css";
  import "../../../../scss/alert.css";
  import "../../../../scss/dashboard.css";
  import { page } from "$app/stores";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let datetimeInput;
  let dateInput;
  let timeInput;

  function openPicker(input) {
    input.showPicker();
  }

  let selectedImageName = "";
  let selectedImageUrl = "";
  let error = false;
  let msg = "";
  let adminEmail = $page.data.session.user?.email;
  export let data;
  let event = data.event;

  let showDeleteModal = false;

  onMount(() => {
    selectedImageUrl = event.event_poster;
  });

  function displayImageName(event) {
    const file = event.target.files[0];
    selectedImageName = file ? file.name : "";

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      selectedImageUrl = event.event_poster;
    }
  }

  async function handleDeleteEvent() {
    const event_id = event.id;
    console.log("console logging event_id", event_id);
    try {
      const response = await fetch(
        `${PUBLIC_BACKEND_URL}/dashboard/delete-event`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            event_id: event_id,
            event_poster: event.event_poster,
          }),
        },
      );
      const result = await response.json();
      if (!result.error) {
        msg = result.msg;
        toast.success(msg, {
          position: "bottom-center",
        });
        goto("/admin/dashboard", { replaceState: true, reload: true });
      } else {
        error = true;
        msg = result.msg;
        toast.error(msg, {
          position: "bottom-center",
        });
      }
    } catch (err) {
      console.error(err);
      msg = "An unexpected error occurred.";
      toast.error(msg, {
        position: "bottom-center",
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    let formData = new FormData(form);
    formData.append("last_updated_by", adminEmail);

    try {
      const response = await fetch(
        `${PUBLIC_BACKEND_URL}/dashboard/update-event`,
        {
          method: "PUT",
          body: formData,
        },
      );
      const result = await response.json();
      if (!response.ok) {
        error = true;
        msg = result.msg;
        toast.error(msg, {
          position: "bottom-center",
        });
      } else {
        error = false;
        msg = result.msg;
        toast.success(msg, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error(error);
      error = true;
      msg = "An unexpected error occurred. Contact support.";
      toast.error(msg, {
        position: "bottom-center",
      });
    }
  }

  function confirmDelete() {
    showDeleteModal = true;
  }

  function closeDeleteModal() {
    showDeleteModal = false;
  }

  function handleConfirmDelete() {
    closeDeleteModal();
    handleDeleteEvent();
  }
</script>

{#if event}
  <div class="c-event-container dashboard-main">
    <h2 class="title">Edit Event</h2>
    <form
      action="http://localhost:3000/dashboard/update-event"
      method="PUT"
      enctype="multipart/form-data"
      on:submit={handleSubmit}
    >


      <label for="event_poster" class="file-label"
        >Select Poster of Event:</label
      >
      <div class="file-wrapper">
        <input
          type="file"
          id="event_poster"
          name="event_poster"
          accept="image/webp, image/avif"
          on:change={displayImageName}
          style="display: none;"
        />
        {#if selectedImageUrl}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <div class="poster-container">
            <img src={selectedImageUrl} alt="Poster Preview" />
          </div>
        {/if}
        <button
          type="button"
          class="file-button"
          on:click={() => document.getElementById("event_poster").click()}
        >
          Choose File
        </button>
        <p style="color: darkgrey;">*Note: Only webp is allowed.</p>
      </div>
      <br /><br />

      <label for="title">Title:</label><br />
      <input
        type="text"
        id="title"
        bind:value={event.title}
        name="title"
        required
      /><br /><br />
      <input type="hidden" name="id" bind:value={event.id} />

      <label for="description">Description:</label><br />
      <textarea
        id="description"
        bind:value={event.description}
        name="description"
        rows="4"
        cols="50"
        required
      ></textarea><br /><br />

      <div class="row">
        <div class="col">
          <label for="date">Date:</label>
          <input
            bind:this={dateInput}
            on:click={() => openPicker(dateInput)}
            type="date"
            id="date"
            bind:value={event.date}
            name="date"
            required
          />
        </div>
        <div class="col">
          <label for="time">Time:</label>
          <input
            bind:this={timeInput}
            on:click={() => openPicker(timeInput)}
            type="time"
            id="time"
            bind:value={event.time}
            name="time"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            step="5"
            placeholder="Enter price"
            min="0"
            bind:value={event.price}
            required
          />
        </div>
        <div class="col">
          <label for="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            placeholder="Enter venue"
            bind:value={event.venue}
            required
          />
        </div>
      </div>

      <label for="category">Category:</label><br />
      <select
        id="category"
        name="category"
        bind:value={event.category}
        required
      >
         <optgroup label="Select Type of Event" disabled>
          <option selected hidden>Select Type of Event</option>
        </optgroup>
        <option value="Events">Events</option>
        <option value="Movies">Movies</option> 
        Add more options as needed 
      </select>
      <br /><br />

      <label for="deadline">Deadline</label>
      <input
        bind:this={datetimeInput}
        on:click={() => openPicker(datetimeInput)}
        type="datetime-local"
        bind:value={event.deadline}
        name="deadline"
      />
      <label for="max_registrations">Max Registration</label>
      <input
        type="number"
        name="max_registrations"
        bind:value={event.max_registrations}
        required
      />

      <label for="details">Details:</label><br />
      <textarea
        id="details"
        bind:value={event.details}
        name="details"
        rows="4"
        cols="50"
        required
      ></textarea><br /><br />

      <label for="terms_conditions">Terms & Conditions:</label><br />
      <textarea
        id="terms_conditions"
        name="terms_conditions"
        rows="4"
        cols="50"
        bind:value={event.terms_conditions}
        required
      ></textarea><br /><br />

      <label for="refund_policy">Refund Policy:</label><br />
      <textarea
        id="refund_policy"
        name="refund_policy"
        rows="4"
        cols="50"
        bind:value={event.refund_policy}
        required
      ></textarea><br /><br />

      <div class="action-buttons">
        <button type="submit" class="updatebtn">UPDATE</button>
        <button
          type="button"
          id="deleteBtn"
          class="deleteBtn"
          on:click={confirmDelete}>Delete Event</button
        >
      </div>
    </form>
  </div>
{:else}
  <div class="c-event-container dashboard-main">
    <h1>No such event exists</h1>
  </div>
{/if}

{#if showDeleteModal}
  <div class="modal">
    <div class="modal-content">
      <h2 class="jk">Are you sure you want to delete this event?</h2>
      <button on:click={handleConfirmDelete} class="modal-btn dlt"
        >Delete</button
      >
      <button on:click={closeDeleteModal} class="modal-btn">Cancel</button>
    </div>
  </div>
{/if}

<style>
  .c-event-container {
    padding: 1rem;
  }
  .jk {
    color: black;
  }
</style>
