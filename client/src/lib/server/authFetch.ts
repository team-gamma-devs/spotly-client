import { createHmac } from 'crypto';
import { env } from '$env/dynamic/private';

const BACKEND_SECRET = env.BACKEND_SECRET;


/**
 * Generates a SHA256 HMAC signature for a given payload and timestamp.
 * @param payload The stringified request body. For multipart requests, this should be an empty string.
 * @param timestamp The timestamp of the request in milliseconds.
 * @returns The hexadecimal signature string.
 */
export function signRequest(payload: string, timestamp: number): string {
	if (!BACKEND_SECRET) {
		throw new Error('BACKEND_SECRET environment variable is not set');
	}

	const message = `${timestamp}:${payload}`;
	return createHmac('sha256', BACKEND_SECRET).update(message).digest('hex');
}

/**
 * Creates authentication headers for application/json requests.
 * The signature is generated from the stringified JSON body.
 * @param body The request body object.
 * @returns A Headers object with the required authentication headers.
 */
function createJsonAuthHeaders(body?: any): Headers {
	const timestamp = Date.now();
	const payload = body ? JSON.stringify(body) : '';
	const signature = signRequest(payload, timestamp);

	return new Headers({
		'Content-Type': 'application/json',
		'X-Signature': signature,
		'X-Timestamp': timestamp.toString(),
		'X-Frontend-Origin': 'vercel-spotly-client',
	});
}

/**
 * A fetch utility for making signed requests with a JSON body.
 * Use this for all standard API calls that don't involve file uploads.
 * @param url The URL to fetch.
 * @param options The request options, including the body to be signed.
 * @returns The fetch Response promise.
 */
export async function signedJsonFetch(url: string, options: RequestInit = {}): Promise<Response> {
	const body = options.body;
	const authHeaders = createJsonAuthHeaders(body ? JSON.parse(body as string) : undefined);
	// console.log("****** Signed JSON Called With **********");
	// console.log("URL: " + url);
	// console.log("Options: " + JSON.stringify(options));
	// console.log("Body:" + body);
	// console.log("authHeaders: " + JSON.stringify(Object.fromEntries(authHeaders.entries())));

	return fetch(url, {
		...options,
		headers: {
			...Object.fromEntries(authHeaders.entries()),
			...options.headers,
		},
	});
}

/**
 * Creates authentication headers for multipart/form-data requests.
 * The signature is generated with an empty payload because the FormData
 * body cannot be read and stringified on the server.
 * @returns A Headers object with the required authentication headers.
 */

// ****************************** FINAL VERSION *********************************
function createMultipartAuthHeaders(): Headers {
	const timestamp = Date.now();
	const payload = '';
	const signature = signRequest(payload, timestamp);

	return new Headers({
		'X-Signature': signature,
		'X-Timestamp': timestamp.toString(),
		'X-Frontend-Origin': 'vercel-spotly-client',
	});
}

// /**
//  * A fetch utility for making signed multipart/form-data requests (file uploads).
//  * @param url The URL to fetch.
//  * @param options The request options. The body MUST be a FormData object.
//  * @returns The fetch Response promise.
//  */
// export async function signedMultipartFetch(url: string, options: RequestInit = {}): Promise<Response> {
// 	if (!(options.body instanceof FormData)) {
// 		throw new Error('signedMultipartFetch is only for FormData bodies.');
// 	}

// 	const authHeaders = createMultipartAuthHeaders();

// 	return fetch(url, {
// 		...options,
// 		headers: {
// 			...Object.fromEntries(authHeaders.entries()),
// 			...options.headers,
// 		},
// 	});
// }


// ****************************** DEBUG VERSION *****************************

export async function signedMultipartFetch(url: string, options: RequestInit = {}): Promise<Response> {
  console.log('[signedMultipartFetch] Starting request', { url, method: options.method || 'GET' });
  
  if (!(options.body instanceof FormData)) {
    console.error('[signedMultipartFetch] Invalid body type - expected FormData');
    throw new Error('signedMultipartFetch is only for FormData bodies.');
  }
  
  console.log('[signedMultipartFetch] Creating auth headers');
  const authHeaders = createMultipartAuthHeaders();
  console.log('[signedMultipartFetch] Auth headers created', {
    headerCount: authHeaders,
    headerKeys: Array.from(authHeaders.keys())
  });
  
  const finalHeaders = {
    ...Object.fromEntries(authHeaders.entries()),
    ...options.headers,
  };
  
  console.log('[signedMultipartFetch] Final headers prepared', {
    totalHeaderCount: Object.keys(finalHeaders).length
  });
  
  try {
    console.log('[signedMultipartFetch] Initiating fetch request');
    const response = await fetch(url, {
      ...options,
      headers: finalHeaders,
    });
    
    console.log('[signedMultipartFetch] Response received', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });
    
    return response;
  } catch (error) {
    console.error('[signedMultipartFetch] Fetch failed', {
      error: error instanceof Error ? error.message : String(error),
      url
    });
    throw error;
  }
}
