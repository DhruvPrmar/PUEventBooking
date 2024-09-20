<script>
    import { fade } from "svelte/transition";
    import EventCard from "./EventCard.svelte";
  
    export let data;
  
    // console.log('Events.svelte data: ', data);
  </script>
  
  <div class="events-container" in:fade>
    <h2 class="section-title">Events</h2>
    <EventCard {data}/>
  </div>
  