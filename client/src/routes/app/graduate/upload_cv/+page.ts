/**
 * @fileoverview Page load function for the CV upload page.
 * Provides metadata that is passed to the page and layout components.
 * 
 * @module routes/app/graduate/upload_cv/+page
 */

import type { PageLoad } from './$types';

/**
 * Load function that runs on both client and server.
 * Returns page metadata to be consumed by the page component.
 * 
 * @returns Page data object containing the page title
 */
export const load: PageLoad = () => {
	return {
		title: 'Upload CVs',
	};
};