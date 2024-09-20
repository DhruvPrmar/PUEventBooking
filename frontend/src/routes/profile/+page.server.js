import pool from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({locals}) => {
    const session = await locals.auth();
    console.log("Profile +page.server.js: ",session)


    if(!session?.user){
        throw redirect(302, '/')
    }

    return {
        user: session.user
    }
}