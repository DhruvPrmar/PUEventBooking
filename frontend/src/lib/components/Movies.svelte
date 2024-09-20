<script>
  import { fade } from "svelte/transition";
  import MovieCard from "./MovieCard.svelte";

  export let data;
  console.log("Movies.svelte data: ", data);
</script>

<div class="events-container" in:fade>
  <h2 class="section-title">Shows</h2>
  <MovieCard {data}/>
</div>
