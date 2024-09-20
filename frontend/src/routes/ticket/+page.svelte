<script>
    import {fade} from "svelte/transition";
    import movieImg from "$lib/img/strange.webp";
    import qr from "$lib/img/qr.png";

    let ticketDetails = {
        id: 1,
        poster: movieImg,
        movieTitle: "Doctor Strange in the Multiverse of Madness",
        name: "Aksh",
        date: "Fri, March 1",
        venue: "Watchers Park",
        time: "9 pm",
        price: "5",
        qr: qr,
        qr_num: "123456789",
    };
</script>

<div class="ticket-container" in:fade>
    <button class="back-btn">
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
    <div class="cardWrap">
        <div class="card cardTop">
            <div class="poster-container">
                <img src={ticketDetails.poster} alt="" />
            </div>
            <div class="text">
                <h3 class="title">{ticketDetails.movieTitle}</h3>
                <div class="list-container">
                    <div class="list">
                        <p class="label">Date</p>
                        <p class="data">{ticketDetails.date}</p>
                    </div>
                    <div class="list">
                        <p class="label">Time</p>
                        <p class="data">{ticketDetails.time}</p>
                    </div>
                    <div class="list">
                        <p class="label">Venue</p>
                        <p class="data">{ticketDetails.venue}</p>
                    </div>
                    <div class="list">
                        <p class="label">Price</p>
                        <p class="data price">₹{ticketDetails.price}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card cardBottom">
            <div class="qr-container">
                <img src={ticketDetails.qr} alt="" />
            </div>
            <!-- <p class="qr-num">{ticketDetails.qr_num}</p> -->
        </div>
    </div>
</div>
