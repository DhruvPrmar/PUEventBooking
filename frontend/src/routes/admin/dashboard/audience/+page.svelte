<script>
    import "../../../../scss/home.css";
    import "../../../../scss/admin.css";
    import "../../../../scss/dashboard.css";
    import { writable } from "svelte/store";
    import userImg from "$lib/img/default-user-img.png";

    let searchQuery = writable("");

    let movieTitle = "Main hoon lucky the racer";

    let audience = [
        {
            id: 1,
            img: userImg,
            name: "Ramesh",
            email: "ramesh@parul.com",
            enrollment: "1234567890",
            booked_at: "20 July, 2024 12:90 PM",
            payment: "UPI",
        },
        {
            id: 2,
            img: userImg,
            name: "Jatin",
            email: "jatin@parul.com",
            enrollment: "987654386",
            booked_at: "19 July, 2024 17:90 PM",
            payment: "UPI",
        },
        {
            id: 3,
            img: userImg,
            name: "Asfakh",
            email: "asfakh@parul.com",
            enrollment: "432578934",
            booked_at: "18 July, 2024 12:90 PM",
            payment: "UPI",
        },
    ];

    // Function to filter the admins based on searchQuery
    $: filteredAudience = audience.filter((audience) => {
        const query = $searchQuery.toLowerCase();
        return (
            audience.name.toLowerCase().includes(query) ||
            audience.email.toLowerCase().includes(query) ||
            audience.booked_at.toLowerCase().includes(query) ||
            audience.enrollment.toLowerCase().includes(query)
        );
    });
</script>

<div class="audience-container">
    <div class="audience-top">
        <a href="/admin/dashboard">
            <svg
                class="back-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                ><path
                    d="M20.7 267.3c-6.2-6.2-6.2-16.4 0-22.6l192-192c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L54.6 256 235.3 436.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-192-192z"
                /></svg
            >
        </a>
        <h3 class="title"><span>Audience of</span> {movieTitle}</h3>
    </div>

    <div class="audience-table">
        <div class="audience-table-top">
            <input
                type="text"
                placeholder="Search for Name, Enrollment, or Booking date & time"
                bind:value={$searchQuery}
            />

            <button title="Export data as .csv file">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    ><path
                        d="M385 233c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-71 71V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V270.1l-71-71c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 345c9.4 9.4 24.6 9.4 33.9 0L385 233zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H440c39.8 0 72-32.2 72-72V104c0-39.8-32.2-72-72-72H392c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24 10.7 24 24V440c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z"
                    /></svg
                >
                Export Data</button
            >
        </div>

        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Transaction ID</th>
                    <th>Enrollment</th>
                    <th>Booked at</th>
                    <th>Payment Method</th>
                </tr>
                {#each filteredAudience as audience (audience.id)}
                    <tr>
                        <td
                            ><div class="img-name">
                                <div class="pfp-container">
                                    <img src={audience.img} alt="" />
                                </div>
                                {audience.name}
                            </div></td
                        >
                        <td>{audience.id}</td>
                        <td>{audience.enrollment}</td>
                        <td>{audience.booked_at}</td>
                        <td>{audience.payment}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
