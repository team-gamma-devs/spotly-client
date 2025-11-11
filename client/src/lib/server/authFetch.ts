import { createHmac } from 'crypto';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

const BACKEND_SECRET = env.BACKEND_SECRET;

/**
 * Generates a SHA256 HMAC signature for a given payload and timestamp.
 * @param payload The stringified request body. For GET/multipart requests, this should be an empty string.
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
 * @param body The request body object.
 * @param token The bearer token for authorization.
 * @returns A Headers object with the required authentication headers.
 */
function createJsonAuthHeaders(body?: any, token?: string): Headers {
    const timestamp = Date.now();
    const payload = body ? JSON.stringify(body) : '';
    const signature = signRequest(payload, timestamp);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'X-Signature': signature,
        'X-Timestamp': timestamp.toString(),
        'X-Frontend-Origin': 'vercel-spotly-client',
    });

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
}

/**
 * A fetch utility for making signed requests with a JSON body.
 * @param url The URL to fetch.
 * @param options The request options, including the body to be signed.
 * @param token Optional bearer token for authorization.
 * @returns The fetch Response promise.
 */
export async function signedJsonFetch(
    url: string, 
    options: RequestInit = {},
    token?: string
): Promise<Response> {
    const body = options.body;
    const authHeaders = createJsonAuthHeaders(body ? JSON.parse(body as string) : undefined, token);
    
    if (dev) {
        console.log("****** Signed JSON Called With **********");
        console.log("URL: " + url);
        console.log("Options: " + JSON.stringify(options));
        console.log("Body:" + body);
        console.log("Token:", token ? `${token.slice(0, 10)}...` : 'none');
        console.log("authHeaders: " + JSON.stringify(Object.fromEntries(authHeaders.entries())));
        console.log("*****************END**********************");
    }

    return fetch(url, {
        ...options,
        headers: {
            ...Object.fromEntries(authHeaders.entries()),
            ...options.headers,
        },
    });
}

/**
 * Creates authentication headers for GET requests (no body).
 * @param token The bearer token for authorization.
 * @returns A Headers object with the required authentication headers.
 */
function createGetAuthHeaders(token?: string): Headers {
    const timestamp = Date.now();
    const payload = '';
    const signature = signRequest(payload, timestamp);

    const headers = new Headers({
        'X-Signature': signature,
        'X-Timestamp': timestamp.toString(),
        'X-Frontend-Origin': 'vercel-spotly-client',
    });

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
}

/**
 * A fetch utility for making signed GET requests.
 * @param url The URL to fetch (including query parameters if needed).
 * @param options Optional request options (should not include body).
 * @param token Optional bearer token for authorization.
 * @returns The fetch Response promise.
 */
export async function signedGetFetch(
    url: string, 
    options: RequestInit = {},
    token?: string
): Promise<Response> {
    const authHeaders = createGetAuthHeaders(token);
    
    if (dev) {
        console.log("****** Signed GET Called With **********");
        console.log("URL: " + url);
        console.log("Options: " + JSON.stringify(options));
        console.log("Token:", token ? `${token.slice(0, 10)}...` : 'none');
        console.log("authHeaders: " + JSON.stringify(Object.fromEntries(authHeaders.entries())));
        console.log("*****************END**********************");
    }

    return fetch(url, {
        ...options,
        method: 'GET',
        headers: {
            ...Object.fromEntries(authHeaders.entries()),
            ...options.headers,
        },
    });
}

/**
 * Creates authentication headers for multipart/form-data requests.
 * @param token The bearer token for authorization.
 * @returns A Headers object with the required authentication headers.
 */
function createMultipartAuthHeaders(token?: string): Headers {
    const timestamp = Date.now();
    const payload = '';
    const signature = signRequest(payload, timestamp);

    const headers = new Headers({
        'X-Signature': signature,
        'X-Timestamp': timestamp.toString(),
        'X-Frontend-Origin': 'vercel-spotly-client',
    });

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
}

/**
 * A fetch utility for making signed multipart/form-data requests (file uploads).
 * @param url The URL to fetch.
 * @param options The request options. The body MUST be a FormData object.
 * @param token Optional bearer token for authorization.
 * @returns The fetch Response promise.
 */
export async function signedMultipartFetch(
    url: string, 
    options: RequestInit = {},
    token?: string
): Promise<Response> {
    if (!(options.body instanceof FormData)) {
        throw new Error('signedMultipartFetch is only for FormData bodies.');
    }

    const authHeaders = createMultipartAuthHeaders(token);
    const finalHeaders = {
        ...Object.fromEntries(authHeaders.entries()),
        ...options.headers,
    };

    if (dev) {
        console.log("****** Signed Multipart Called With **********");
        console.log("URL: " + url);
        console.log("Token:", token ? `${token.slice(0, 10)}...` : 'none');
        console.log("authHeaders: " + JSON.stringify(Object.fromEntries(authHeaders.entries())));
        console.log("*****************END**********************");
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers: finalHeaders,
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
