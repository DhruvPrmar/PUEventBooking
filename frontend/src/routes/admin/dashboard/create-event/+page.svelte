<script>
  // @ts-nocheck
  import "../../../../scss/home.css";
  import "../../../../scss/dashboard.css";
  import { page } from "$app/stores";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  let selectedImageUrl = "";
  let error = false;
  let msg = "";
  let adminEmail = $page.data.session.user?.email;
  let datetimeInput;
  let dateInput;
  let timeInput;

  function openPicker(input) {
    input.showPicker();
  }

  function displayImageName(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      selectedImageUrl = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    let formData = new FormData(form);
    formData.append("created_by", adminEmail);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        error = result.error;
        msg = result.msg;
        toast.error(msg, {
          position: "bottom-center",
        });
      } else {
        error = result.error;
        msg = result.msg;
        toast.success(msg, {
          position: "bottom-center",
        });
        goto("/admin/dashboard", { replaceState: true, reload: true });
      }
    } catch (err) {
      console.log(err);
      error = true;
      msg = "An unexpected error occured.";
      toast.error(msg, {
        position: "bottom-center",
      });
    }
  }
</script>

<div class="c-event-container dashboard-main">
  <h2 class="title">Create Event</h2>
  <form
    action="http://localhost:3000/dashboard/create-event"
    method="POST"
    enctype="multipart/form-data"
    on:submit={handleSubmit}
  >
  <div class="radio-category">
    <div class="category-btn">
      <input type="radio" id="events" value="Events" name="category" />
      <label for="events" class="button">Events</label>
    </div>
    <div class="category-btn">
      <input type="radio" id="shows" value="Movies" name="category" />
      <label for="shows" class="button">Shows</label>
    </div>
  </div>

    <label for="event_poster" class="file-label">Select Poster of Event:</label>
    <div class="file-wrapper">
      <input
        type="file"
        id="event_poster"
        name="event_poster"
        accept="image/webp"
        on:change={displayImageName}
        style="visibility: hidden;"
      />
      {#if selectedImageUrl}
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

    <label for="title" class="required">Title:</label><br />
    <input type="text" id="title" name="title" required /><br /><br />

    <label for="description" class="required">Description:</label><br />
    <textarea id="description" name="description" rows="4" cols="50" required
    ></textarea><br /><br />

    <div class="row">
      <div class="col">
        <label for="date" class="required">Date:</label>
        <input
          bind:this={dateInput}
          on:click={() => openPicker(dateInput)}
          type="date"
          id="date"
          name="date"
          required
        />
      </div>
      <div class="col">
        <label for="time" class="required">Time:</label>
        <input
          bind:this={timeInput}
          on:click={() => openPicker(timeInput)}
          type="time"
          id="time"
          name="time"
          required
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="price" class="required">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          step="5"
          placeholder="Enter price"
          min="0"
          required
        />
      </div>
      <div class="col">
        <label for="venue" class="required">Venue:</label>
        <input
          type="text"
          id="venue"
          name="venue"
          placeholder="Enter venue"
          required
        />
      </div>
    </div>

    <!-- <label for="category" class="required">Category:</label><br />
    <select id="category" name="category" required>
      <optgroup label="Select Type of Event" disabled>
        <option selected hidden>Select Type of Event</option>
      </optgroup>
      <option value="Events">Events</option>
      <option value="Movies">Shows</option>
     
    </select> -->

    <br /><br />

    <label for="deadline">Deadline</label>
    <input
      bind:this={datetimeInput}
      on:click={() => openPicker(datetimeInput)}
      type="datetime-local"
      name="deadline"
    />
    <label for="max_registrations">Max Registration</label>
    <input type="number" name="max_registrations" />

    <label for="details" class="required">Details:</label><br />
    <textarea id="details" name="details" rows="4" cols="50" required
    ></textarea><br /><br />

    <label for="terms_conditions" class="required">Terms & Conditions:</label
    ><br />
    <textarea
      id="terms_conditions"
      name="terms_conditions"
      rows="4"
      cols="50"
      required
    ></textarea><br /><br />

    <label for="refund_policy" class="required">Refund Policy:</label><br />
    <textarea
      id="refund_policy"
      name="refund_policy"
      rows="4"
      cols="50"
      required
    ></textarea><br /><br />

    <button type="submit">POST</button>
  </form>
</div>

<style>
  .c-event-container {
    padding: 1rem;
  }
</style>
