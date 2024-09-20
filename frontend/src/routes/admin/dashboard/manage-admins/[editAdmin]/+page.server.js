// @ts-nocheck
import { error } from "@sveltejs/kit";
import pool from "$lib/db.js";
import { isAdmin } from "$lib/hooks/auth.js";

export const load = async ({ locals, request, params }) => {
  const session = await locals.auth();
  if (!session) {
    throw error(404, "Page not found");
  }
  const admin = await isAdmin(request);
  if (admin === null) {
    throw error(404, "Page not found.");
  }

  if (admin.role == "admin") {
    throw error(401, "Unauthorized");
  }
  const adminEmail = parseInt(params.editAdmin);

  try{
    const [rows] = await pool.execute(`SELECT id, email, valid_till, granted_by, role, valid_from FROM admins WHERE email = ?`, [adminEmail])
    console.log("Admin data rows from edit-admin: ", rows)
    if(rows.length === 0){
      throw new Error(`Admin with email ${adminEmail} does not exists`);

    }
    const adminDataToBeEdited = rows[0];
  
    return {
      adminSessionData: admin,
      adminData: adminDataToBeEdited
    };
  }catch(error){
    console.error("DB ERROR: ",error)
    return {
      error: true
    }
  }
};
