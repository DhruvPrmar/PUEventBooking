<script>
    import { fade } from "svelte/transition";
    let bookings = [
        {
            id: 1,
            title: "Endgame",
            date: "Fri, March 1",
            time: "9 pm",
            price: "5",
        },
        {
            id: 2,
            title: "IPL - MI vs KKR",
            date: "Fri, March 1",
            time: "9 pm",
            price: "10",
        },
        {
            id: 3,
            title: "Startgame",
            date: "Fri, March 1",
            time: "9 pm",
            price: "5",
        },
    ];
</script>

<div class="bookings-container" in:fade>
    <div class="bookings-top">
        <button>
            <a href="/profile">
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
        <h3>Bookings</h3>
    </div>

    <div class="booking-cards-container">
        {#each bookings as booking (booking.id)}
            <div class="booking-card">
                <h3 class="title">{booking.title}</h3>
                <div class="details">
                    <p class="date">{booking.date}</p> <span class="line">|</span>
                    <p class="time">{booking.time}</p> <span class="line">|</span>
                    <p class="price">₹{booking.price}</p>
                </div>
            </div>
        {/each}
    </div>
</div>
