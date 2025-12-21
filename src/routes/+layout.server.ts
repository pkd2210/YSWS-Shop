export async function load({ cookies }: any) {
    const access_token = cookies.get('hca_access_token') || null;
    const response = await fetch('https://auth.hackclub.com/api/v1/me', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    const data = await response.json();
    return {
        user: data.identity
    };
}