// @ts-nocheck
import pool from "$lib/db";
import { error } from "@sveltejs/kit";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const authenticateAdmin = async (locals) => {
    const session = await locals.auth();

    if (!session?.user) {
        throw error(404, 'Page not found');
    }

    const [user] = await pool.query('SELECT * FROM admins WHERE email = ?', [session.user.email]);

    if (user.length === 0) {
        console.log(`User ${session.user.email} tried accessing dashboard`)
        throw error(404, "Page not found");
    }

    return session;
};


export const isAdmin = async (request) => {
    const cookieHeader = request.headers.get("cookie");

    if(!cookieHeader){
        return null
    }
    const response = await fetch(`${PUBLIC_BACKEND_URL}/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
      });
    const result = await response.json()
    if(response.ok){
        return result.admin
    }
    else{
        return null
    }
}