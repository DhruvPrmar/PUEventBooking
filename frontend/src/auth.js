// @ts-nocheck
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { AUTH_SECRET, GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";
import pool from "$lib/db";

export const {handle} = SvelteKitAuth({
    providers: [
        Google({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET
        })
    ],
    callbacks: {
        async signIn({profile}) {
            const emailDomain = profile?.email?.split('@')[1];
            if(emailDomain !== "paruluniversity.ac.in") {
                console.log('Unauthorised Domain', profile?.email)
                throw new AccessDenied('Unauthorised_Domain')
            }

            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [profile?.email])

       
            if(rows.length === 0){
                await pool.query('INSERT INTO users (name, email, picture) VALUES (?, ?, ?)', [
                    profile?.name,
                    profile?.email,
                    profile?.picture
                ]);
            }
            return true;
        },
        async redirect({baseUrl }) {
            return baseUrl;  // Redirect to the home page after sign-in
        },
    secret: AUTH_SECRET
}})