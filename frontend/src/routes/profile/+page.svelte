<script>
    import { fade } from "svelte/transition";
    import movieImg from "$lib/img/strange.webp";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { signOut } from "@auth/sveltekit/client";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    let movieTitle = "Doctor Strange in the Multiverse of Madness";

    async function handleLogout() {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/adminLogout`, {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            signOut();
            goto("/");
        } else {
            alert("An unexpected error occured.");
        }
    }
</script>

{#if $page.data.session}
    <div class="profile-container" in:fade>
        <div class="profile-top">
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
        <div class="pfp-name">
            <div class="pfp-container">
                <img src={$page.data.session.user?.image} alt="Profile Img" />
            </div>
            <h3>{$page.data.session.user?.name}</h3>
        </div>
        <div class="cardWrap">
            <div class="card cardLeft">
                <div class="leftTop">
                    <div class="title">
                        <h3>{movieTitle}</h3>
                    </div>
                    <p class="text">(Current Booking)</p>
                </div>
                <a href="/ticket">View more</a>
            </div>
            <div class="card cardRight">
                <div class="poster-container">
                    <img src={movieImg} alt="" />
                </div>
            </div>
        </div>
        <div class="bookings-btn">
            <a href="/profile/bookings">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                    ><path
                        d="M160 48H576c26.5 0 48 21.5 48 48v49.9c-.3 .1-.6 .3-.9 .4C596 153.6 576 178.5 576 208s20 54.4 47.1 61.8c.3 .1 .6 .2 .9 .4V320c0 26.5-21.5 48-48 48H160c-26.5 0-48-21.5-48-48V96c0-26.5 21.5-48 48-48zM96 96V320c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V268.8c0-7.1-5.8-12.6-12.7-14.5C607 248.8 592 230.1 592 208s15-40.8 35.3-46.3c6.8-1.9 12.7-7.4 12.7-14.5V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zm400 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm0 64a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm16 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-16 80a16 16 0 1 0 0-32 16 16 0 1 0 0 32zM16 96c0-4.4-3.6-8-8-8s-8 3.6-8 8V376c0 57.4 46.6 104 104 104H552c4.4 0 8-3.6 8-8s-3.6-8-8-8H104c-48.6 0-88-39.4-88-88V96z"
                    /></svg
                >
                <div class="text">
                    <h4>Your Bookings</h4>
                    <p>View all your bookings</p>
                </div>
            </a>
        </div>
        <div class="signout-btn">
            <button on:click={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    ><path
                        d="M492.7 248c2.1 2.1 3.3 5 3.3 8s-1.2 5.9-3.3 8L360.6 395.8c-2.7 2.7-6.4 4.2-10.2 4.2c-8 0-14.4-6.5-14.4-14.4l0-73.6c0-4.4-3.6-8-8-8l-136 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16l136 0c4.4 0 8-3.6 8-8l0-73.6c0-8 6.5-14.4 14.4-14.4c3.8 0 7.5 1.5 10.2 4.2L492.7 248zm19.3 8c0-7.2-2.9-14.2-8-19.3L371.9 104.9c-5.7-5.7-13.4-8.9-21.5-8.9c-16.8 0-30.4 13.6-30.4 30.4l0 65.6-128 0c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l128 0 0 65.6c0 16.8 13.6 30.4 30.4 30.4c8.1 0 15.8-3.2 21.5-8.9L504 275.3c5.1-5.1 8-12.1 8-19.3zM184 48c4.4 0 8-3.6 8-8s-3.6-8-8-8L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l96 0c4.4 0 8-3.6 8-8s-3.6-8-8-8l-96 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l96 0z"
                    /></svg
                >
                Signout
            </button>
        </div>
    </div>
{:else}
    <button on:click={() => goto("/auth")}>Sign In</button>
{/if}
