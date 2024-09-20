// @ts-nocheck
import pool from "$lib/db";
import { authenticateAdmin, isAdmin } from "$lib/hooks/auth.js";
import { error, redirect } from "@sveltejs/kit";
import { PUBLIC_BACKEND_URL } from "$env/static/public";


export const load = async ({ fetch, locals, request }) => {
  const session = await locals.auth();
  if (!session) {
    throw error(404, "Page not found");
  }

  const admin = await isAdmin(request);

  if (admin) {
    throw redirect(302, "/admin/dashboard");
  } else {
    const [rows] = await pool.execute(
      `SELECT id, email, valid_till, granted_by, role FROM admins where email = ?`,
      [session?.user?.email]
    );
    if (rows.length === 0) {
      throw error(404, "Page not found");
    } else {
      const adminData = rows[0];
      console.log("admin data", adminData);
      if (adminData.email === session.user.email) {
        return { adminData };
      } else {
        throw error(404, "Page not found");
      }
    }
  }
};
