import Airtable from 'airtable';

export async function load({ cookies }: any) {
    const access_token = cookies.get('hca_access_token') || null;
    const response = await fetch('https://auth.hackclub.com/api/v1/me', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    const data = await response.json();

    let isAdmin = false;
    if (data.identity?.slack_id) {
        try {
            const base = new Airtable({ 
                apiKey: process.env.AIRTABLE_ACCESS_TOKEN 
            }).base(process.env.BASE_ID!);
            
            const records = await base(process.env.ADMIN_LIST_TABLE_ID!).select().all();
            const adminSlackIds = records.map((record) => record.get('SlackID')).filter(Boolean);
            isAdmin = adminSlackIds.includes(data.identity.slack_id);
        } catch (error) {
            console.error('Error checking admin status:', error);
            isAdmin = false;
        }
    }
    
    return {
        user: data.identity,
        isAdmin
    };
}