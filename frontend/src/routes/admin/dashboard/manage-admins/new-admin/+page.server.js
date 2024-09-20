import { error } from "@sveltejs/kit";
import pool from "$lib/db.js";
import { isAdmin } from "$lib/hooks/auth.js";

export const load = async ({ locals, request }) => {
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
  if (admin.role == "developer" || admin.role == "master") {
    return { adminData: admin };
  } else {
    throw error(401, "Unauthorized");
  }
};
