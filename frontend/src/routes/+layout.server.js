// Import necessary modules
import { redirect } from '@sveltejs/kit';

/**
 * @type {import('./$types').LayoutServerLoad}
 */
export const load = async (event) => {
    return {
        session: await event.locals.auth()
    };
};
