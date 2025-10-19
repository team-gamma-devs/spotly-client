import type { PageLoad } from "./$types";

/**
 * This load function runs on the client and/or server.
 * The data it returns is passed to the page and layout components.
 */
export const load: PageLoad = () => {
    return {
        title: "Upload CVs",
    };
};