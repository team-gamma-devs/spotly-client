// import type { RequestHandler } from './$types';
// import { json } from '@sveltejs/kit';
// import { fetchGithubData } from '$lib/server/githubFetch';

// export const GET: RequestHandler = async ({ cookies }) => {
//   try {
//     const githubData = await fetchGithubData(cookies);

//     // Return the data with a short cache (1 minute) to reduce API calls
//     return json(githubData, {
//       headers: {
//         'Cache-Control': 'private, max-age=60'
//       }
//     });
//   } catch (error: any) {
//     const status = error?.status || 500;
//     return json(
//       { error: error?.message || 'Failed to fetch GitHub data' },
//       { status }
//     );
//   }
// };
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { fetchGithubData } from '$lib/server/githubFetch';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const githubData = await fetchGithubData(cookies);

    // Return the data with a short cache (1 minute) to reduce API calls
    return json(githubData, {
      headers: {
        'Cache-Control': 'private, max-age=60'
      }
    });
  } catch (error: any) {
    const status = error?.status || 500;
    return json(
      { error: error?.message || 'Failed to fetch GitHub data' },
      { status }
    );
  }
};