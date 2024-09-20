<script>
  // @ts-nocheck

  import { fade } from "svelte/transition";
  import img1 from "$lib/img/strange.webp";
  import { onMount } from "svelte";
  import noShowImg from "$lib/img/no-show-exist.png";

  export let data;
  console.log("[eventId] +page.svelte data:", data);
  let event = data.event;

  let activeContent = "details";

  const handleClick = (contentId) => {
    activeContent = contentId;
  };
</script>

{#if data.event !== null}
  <div class="show-page-container" in:fade>
    <div class="show-page-top">
      <button>
        <a href="./">
          <svg
            class="back-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            ><path
              d="M20.7 267.3c-6.2-6.2-6.2-16.4 0-22.6l192-192c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L54.6 256 235.3 436.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-192-192z"
            /></svg
          ></a
        >
      </button>
      <div class="top-gradient"></div>
    </div>
    <div class="contents">
      <div class="posterNdetails">
        <div class="poster-container">
          <img
            src={`http://localhost:3000/uploads/event_posters/${event.event_poster}`}
            alt=""
          />
        </div>
        <div class="details-container">
          <div>
            <h2 class="title">{event.title}</h2>
            <p class="desc">{event.description}</p>
          </div>
          <div class="list-container">
            <div class="list">
              <p class="label">Date</p>
              <p class="data">{event.date}</p>
            </div>
            <div class="list">
              <p class="label">Time</p>
              <p class="data">{event.time}</p>
            </div>
            <div class="list">
              <p class="label">Venue</p>
              <p class="data">{event.venue}</p>
            </div>
            {#if event.price == 0}
              <div class="list">
                <p class="label">Price</p>
                <p class="data price">FREE</p>
              </div>
            {:else}
              <div class="list">
                <p class="label">Price</p>
                <p class="data price">₹{event.price}</p>
              </div>
            {/if}

            <!-- <div class="list">
            <p class="label">Deadline</p>
            <p class="data">{event.deadline}</p>
          </div> -->
            <div class="deadline"><p><i>{event.deadline}</i></p></div>
          </div>
          {#if event.category == "Movies"}
            <button class="book-btn">Book Now</button>
          {:else}
            <button class="book-btn">Register Now</button>
          {/if}
        </div>
      </div>
      <div class="card">
        <div class="navbar">
          <button
            class={`nav-button ${activeContent === "details" && "active"}`}
            on:click={() => handleClick("details")}
          >
            Details
          </button>
          <button
            class={`nav-button ${activeContent === "terms" && "active"}`}
            on:click={() => handleClick("terms")}
          >
            Terms & Conditions
          </button>
          <button
            class={`nav-button ${activeContent === "refunds" && "active"}`}
            on:click={() => handleClick("refunds")}
          >
            Refunds
          </button>
        </div>
        <div class="content-wrapper">
          <div
            class="content details"
            class:active={activeContent === "details"}
          >
            <p>{event.details}</p>
          </div>
          <div class="content terms" class:active={activeContent === "terms"}>
            <p>{event.terms_conditions}</p>
          </div>
          <div
            class="content refunds"
            class:active={activeContent === "refunds"}
          >
            <p>{event.refund_policy}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="no-show-container">
    <img src={noShowImg} alt="No Event" />
    <h1 class="no-show">No such event exist!</h1>
  </div>
{/if}
