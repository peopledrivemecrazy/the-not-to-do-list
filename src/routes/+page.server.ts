import {
	CF_API_TOKEN,
	CF_ZONE_ID,
	CLOUDFLARE_API_KEY,
	CLOUDFLARE_EMAIL,
	DNS_TXT_RECORD_ID
} from '$env/static/private';
import type { PageServerLoad } from './$types';
import Cloudflare from 'cloudflare';

const cloudflare = new Cloudflare({
	apiEmail: CLOUDFLARE_EMAIL,
	apiKey: CLOUDFLARE_API_KEY,
	apiToken: CF_API_TOKEN
});
export const load = (async () => {
	const txtRecordContent = await cloudflare.dns.records.get(DNS_TXT_RECORD_ID, {
		zone_id: CF_ZONE_ID
	});
	const todos = (txtRecordContent.content as string)
		.split(',')
		.filter(Boolean)
		.filter((e) => e !== 'null');
	return { todos };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const todos = data.get('todos') as string;
		const content = todos;
		const editTXTRecord = await cloudflare.dns.records.edit(DNS_TXT_RECORD_ID, {
			content,
			name: 'notodo',
			type: 'TXT',
			zone_id: CF_ZONE_ID,
			ttl: 60,
		});
		return { success: !!editTXTRecord.id };
	}
};
