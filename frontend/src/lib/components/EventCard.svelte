<script>
  // @ts-nocheck
  
    import { onMount } from "svelte";
  
    const backendURL = "http://localhost:3000/uploads/event_posters/";
  
    // Makes img urls
    async function makeSRC(eventPosterName) {
      console.log('MakeSRC value: ', backendURL + eventPosterName)
      return backendURL + eventPosterName;
    }
    
    // Formats date
    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  
    // Formats time
    function formatTime(timeString) {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
  
    export let data;
  
    let events = [];
  
    onMount(async () => {
      events = await Promise.all(data.map(async event => ({
          ...event,
          image: await makeSRC(event.event_poster),
          formattedDate: formatDate(event.date),
          formattedTime: formatTime(event.time)
      })));
    })
  </script>
  
  {#if events.length > 0}
  <div class="events-cards-container">
    {#each events as event}
      <a href={`/${event.id}`}>
        <div class="event-card">
          <div class="poster-container">
            {#if event.image}
              <img src={event.image} alt={event.title + " img"} />
            {:else}
              <p>Loading...</p>
            {/if}
          </div>
          <h2 class="title">{event.title}</h2>
          <div class="more-info">
            <p class="date">{event.formattedDate}</p>
            &nbsp; | &nbsp;
            <p class="time">{event.formattedTime}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>
  {/if}
  