// @ts-nocheck
import pool from "$lib/db.js";
import { isAdmin } from "$lib/hooks/auth.js";
import { error } from "@sveltejs/kit";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust as per your locale and format requirements
};

export const load = async ({ locals, request }) => {
  const session = await locals.auth();
  if (!session) {
    throw error(404, "Page not found");
  }

  const admin = await isAdmin(request);

  if (admin === null) {
    throw error(404, "Page not found.");
  }

  if (admin.role == "developer" || admin.role == "master") {
    let query = "";
    switch (admin.role) {
      case "developer":
        query =
          "SELECT u.email, u.picture, u.name, a.granted_by, a.valid_till, a.role, a.valid_from FROM users u JOIN admins a ON u.email = a.email;";
        break;
      case "master":
        query =
          "SELECT u.email, u.picture, u.name, a.granted_by, a.valid_till, a.role, a.valid_from FROM users u JOIN admins a ON u.email = a.email WHERE role = 'admin';";
        break;
    }
    const [rows] = await pool.execute(query);

    const formattedAdminData = rows.map((admin) => ({
      ...admin,
      valid_till:  admin.valid_till ? formatDate(admin.valid_till) : null,
      valid_from: admin.valid_from ? formatDate(admin.valid_from) : null,
    }));

    // console.log("Manage admins table data: ", formattedAdminData);
    return { admin: admin, adminData: formattedAdminData };
  } else {
    throw error(401, "Unauthorized");
  }
};
