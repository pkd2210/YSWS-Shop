import Airtable from 'airtable';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(process.env.BASE_ID!);

export async function GET({ params, parent }) {
    const data = await parent();
    const userSlackId = data.user?.identity?.slack_id;

    if (!userSlackId) {
        return json([]);
    }

    const records = await base(process.env.ORDERS_TABLE_ID!).select().all();

    if (records.length === 0) {
        return json([]);
    }

    // Only take orders where SlackID matches the current user
    const orders = records
        .filter(record => record.fields.SlackID === userSlackId)
        .map(record => ({
            id: record.id,
            ...record.fields
        }));

    return json(orders);
};