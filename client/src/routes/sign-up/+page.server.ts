import type { PageServerLoad } from '../login/$types';

export const load: PageServerLoad = ({ url }) => {
	console.log(url.searchParams.get('token'));
};
