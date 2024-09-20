// @ts-nocheck
import pool from "$lib/db";
import { isAdmin } from "$lib/hooks/auth";
import { error } from "@sveltejs/kit";
//SELECT id, email, valid_till, granted_by, role FROM admins where email = ?
export const load = async ({ request, locals }) => {
  const admin = await isAdmin(request);
  // console.log('Dashboard +layout.server.js admin data: ', admin)
  if (admin) {
    // console.log("admin in +layout.server.js of -dashboard", admin)
    if (admin.role === "admin") {
      try {
        const [rows] = await pool.execute(`SELECT id, title, date, time, max_registrations, price 
       FROM events 
       WHERE (date > CURRENT_DATE() OR (date = CURRENT_DATE() AND time > CURRENT_TIME())) 
       AND created_by = ? 
       ORDER BY date, time`,
      [admin.email]);
        const result = await pool.execute(
          `SELECT id, email, valid_till, granted_by, role FROM admins where email = ?`,
          [admin.email]
        );
        const adminData = result[0][0];
        console.log("admin table data", result[0][0]);
        return {
          upcommingEvents: rows,
          adminData: adminData,
        };
      } catch (err) {
        console.log("DB ERROR: ", err);
      }
    }
    try {
      const [rows] = await pool.execute(
        `SELECT id, title, date, time, max_registrations, price FROM events WHERE date > CURRENT_DATE() OR (date = CURRENT_DATE() AND time > CURRENT_TIME()) ORDER BY date, time`
      );
      const result = await pool.execute(
        `SELECT id, email, valid_till, granted_by, role FROM admins where email = ?`,
        [admin.email]
      );
      const adminData = result[0][0];
      console.log("admin table data", result[0][0]);
      return {
        upcommingEvents: rows,
        adminData: adminData,
      };
    } catch (err) {
      console.log("DB ERROR: ", err);
    }
  } else {
    throw error(404, "Page not found");
  }
};
