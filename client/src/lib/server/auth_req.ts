import { createHmac } from 'crypto';
import { BACKEND_SECRET } from '$env/static/private';

export function signRequest(payload: string, timestamp: number): string {
  if (!BACKEND_SECRET) {
    throw new Error('BACKEND_SECRET environment variable is not set');
  }
  
  const message = `${timestamp}:${payload}`;
  return createHmac('sha256', BACKEND_SECRET).update(message).digest('hex');
}

export function createAuthHeaders(body?: any): Headers {
  const timestamp = Date.now();
  const payload = body ? JSON.stringify(body) : '';
  const signature = signRequest(payload, timestamp);
  
//   console.log(JSON.stringify({
//     'Content-Type': 'application/json',
//     'X-Signature': signature,
//     'X-Timestamp': timestamp.toString(),
//     'X-Frontend-Origin': 'vercel-spotly-client'
//   }));
  return new Headers({
    'Content-Type': 'application/json',
    'X-Signature': signature,
    'X-Timestamp': timestamp.toString(),
    'X-Frontend-Origin': 'vercel-spotly-client'
  });
}

// util to make auth'd requests
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const body = options.body;
  const authHeaders = createAuthHeaders(body ? JSON.parse(body as string) : undefined);
  
  return fetch(url, {
    ...options,
    headers: {
      ...Object.fromEntries(authHeaders.entries()),
      ...options.headers,
    },
  });
}
