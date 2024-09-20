<script>
// @ts-nocheck

  export let data;
  const currentEvents = data.upcommingEvents;
  // console.log("DashboardEvent.svelte data: ", data.upcommingEvents);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const hourMinute = timeString.substring(0, 5); 
    const [hours, minutes] = hourMinute.split(':');
    let period = 'AM';
    let formattedHours = parseInt(hours, 10);

    if (formattedHours >= 12) {
      period = 'PM';
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    }
    return `${formattedHours}:${minutes} ${period}`;
  };
</script>

<div class="dashboard-event-container">
  <div class="db-event-cards">
    {#each currentEvents as event (event.id)}
      <div class="db-event-card">
        <div class="db-event-details-top">
          <span>
            <h4 class="title">{event.title}</h4>
            <div class="dNt">
              <p class="date">{formatDate(event.date)}</p>
              &nbsp; | &nbsp;
              <p class="time">{formatTime(event.time)}</p>
            </div>
          </span>
          <p class="price">₹{event.price}</p>
        </div>

        <div class="db-event-details-bottom">
          <a href="/admin/dashboard/audience" class="audience" title="Click to see bookers">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M80 80a64 64 0 1 1 128 0A64 64 0 1 1 80 80zm144 0A80 80 0 1 0 64 80a80 80 0 1 0 160 0zm96 64a80 80 0 1 1 0 160 80 80 0 1 1 0-160zm0 176a96 96 0 1 0 0-192 96 96 0 1 0 0 192zm-58.7 48H378.7C443.5 368 496 420.5 496 485.3c0 5.9-4.8 10.7-10.7 10.7H154.7c-5.9 0-10.7-4.8-10.7-10.7C144 420.5 196.5 368 261.3 368zm0-16C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7H485.3c14.7 0 26.7-11.9 26.7-26.7C512 411.7 452.3 352 378.7 352H261.3zM512 16a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm0 144A80 80 0 1 0 512 0a80 80 0 1 0 0 160zm24 48c48.6 0 88 39.4 88 88c0 4.4 3.6 8 8 8s8-3.6 8-8c0-57.4-46.6-104-104-104H444c1.3 5.2 2.4 10.6 3 16h89zm-343 0c.7-5.4 1.7-10.8 3-16H104C46.6 192 0 238.6 0 296c0 4.4 3.6 8 8 8s8-3.6 8-8c0-48.6 39.4-88 88-88h89z"/>
            </svg>
            Audience: {event.max_registrations}
          </a>

          <p class="eraning">Earning: ₹{event.earning}</p>
      
          <a href={`/admin/dashboard/${event.id}`} class="edit">
            <svg class="pen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M395.8 39.6c9.4-9.4 24.6-9.4 33.9 0l42.6 42.6c9.4 9.4 9.4 24.6 0 33.9L417.6 171 341 94.4l54.8-54.8zM318.4 117L395 193.6 159.6 428.9c-7.6 7.6-16.9 13.1-27.2 16.1L39.6 472.4l27.3-92.8c3-10.3 8.6-19.6 16.1-27.2L318.4 117zM452.4 17c-21.9-21.9-57.3-21.9-79.2 0L60.4 329.7c-11.4 11.4-19.7 25.4-24.2 40.8L.7 491.5c-1.7 5.6-.1 11.7 4 15.8s10.2 5.7 15.8 4l121-35.6c15.4-4.5 29.4-12.9 40.8-24.2L495 138.8c21.9-21.9 21.9-57.3 0-79.2L452.4 17z"/>
            </svg>
            Edit
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>
