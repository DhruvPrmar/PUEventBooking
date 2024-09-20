// @ts-nocheck
import pool from "$lib/db";

export const load = async ({ params }) => {
    const event_id = params.eventId;
    console.log("Event ID:", event_id);

    try {
        const [rows] = await pool.execute(
            `SELECT * FROM events WHERE id = ?`, [event_id]
        );
        if (rows.length === 0) {
            return {
                event: null
            };
        }

        // console.log("Rows from +page.server.js in [editEvent]", rows);
        const event = rows[0];

        // Helper functions to format date,time and deadline
        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { month: "short", day: "numeric", year: "numeric" };
            return date.toLocaleDateString("en-US", options);
        }

        function formatTime(timeString) {
            const time = new Date(`1970-01-01T${timeString}`);
            return time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
        }

        // function formatDateTime(dateTime) {
        //     const date = new Date(dateTime);
        //     const options = {
        //         year: "numeric",
        //         month: "long",
        //         day: "numeric",
        //         hour: "2-digit",
        //         minute: "2-digit",
        //         second: "2-digit",
        //         hour12: true,
        //     };
        //     return date.toLocaleString("en-US", options);
        // }

        function formatDateTime(dateTime) {
            const date = new Date(dateTime);
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            };
            
            // Format the date string according to the new options
            let formattedDate = date.toLocaleString("en-US", options);
        
            // Remove the year from the formatted date
            formattedDate = formattedDate.replace(/, \d{4}/, "");
        
            return `Book by ${formattedDate}`;
        }

        // Format the date, time, and deadline fields
        event.date = formatDate(event.date);
        event.time = formatTime(event.time);
        event.deadline = formatDateTime(event.deadline);

        return {
            event,
        };
    } catch (err) {
        console.log("DB ERROR:", err);
        throw err;
    }
};


/** DATA FORMAT OF ROWS*/

// Rows from +page.server.js in [editEvent] [
//     {
//       id: 26,
//       event_poster: '1720506476119-spider.webp',
//       title: 'Oppenheimer ',
//       description: 'Boom 💥💥💥',
//       date: 2024-07-22T18:30:00.000Z,
//       time: '01:00:00',
//       price: '10.00',
//       venue: 'Watchers Park',
//       deadline: 2024-07-20T00:49:00.000Z,
//       category: 'Movies',
//       details: 'null',
//       terms_conditions: 'null',
//       refund_policy: 'lund lele',
//       created_by: '2303031087041@paruluniversity.ac.in',
//       created_at: 2024-07-09T06:20:00.000Z,
//       max_registrations: 1000,
//       last_updated_by: '2303031087041@paruluniversity.ac.in',
//       last_updated_at: 2024-07-09T06:27:56.000Z
//     }
//   ]
  