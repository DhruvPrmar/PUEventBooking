import { authenticateAdmin } from "$lib/hooks/auth";

export const load = async ({ locals }) => {
    const session = await authenticateAdmin(locals);
    console.log('+page.server.js in -dashboard: ', session);
    return session;
};
