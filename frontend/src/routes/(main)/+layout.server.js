// @ts-nocheck
import pool from "$lib/db";

export const load = async () => {
  try {
    const [rows] = await pool.execute(
      `SELECT id, event_poster, title, date, category, time FROM events WHERE date > CURRENT_DATE() OR (date = CURRENT_DATE() AND time > CURRENT_TIME()) ORDER BY date, time`
    );
    // console.log("main laod function ", rows)

    const upcommingMovies = rows.filter(event => event.category == "Movies");
    const upcommingEvents = rows.filter(event => event.category == "Events");
    return {
      upcommingEvents,
      upcommingMovies
    };
  } catch (err) {
    console.log("DB ERROR: ", err);
  }
};
