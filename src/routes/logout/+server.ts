export const GET = async ({ cookies }) => {
    cookies.delete('hca_access_token', { path: '/' });
    return new Response(null, {
        status: 303,
        headers: {
            location: '/'
        }
    });
};