import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
    const data = await parent();
    if (!data.user) {
        throw redirect(303, '/api/login');
    }
    return {
        user: data.user
    };
}