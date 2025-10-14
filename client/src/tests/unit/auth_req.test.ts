// import { describe, it, expect, vi } from 'vitest';
// import { signRequest, createAuthHeaders } from '$lib/server/auth_req';

// describe('Request Signing', () => {
//   it('generates consistent signatures', () => {
//     const payload = '{"email":"test@holberton.com"}';
//     const timestamp = 1640995200000;
    
//     const sig1 = signRequest(payload, timestamp);
//     const sig2 = signRequest(payload, timestamp);
    
//     expect(sig1).toBe(sig2);
//     expect(sig1).toHaveLength(64); // SHA256 hex length
//   });
  
//   it('creates proper auth headers', () => {
//     const headers = createAuthHeaders({ email: 'test@example.com' });
    
//     expect(headers.get('X-Signature')).toBeTruthy();
//     expect(headers.get('X-Timestamp')).toBeTruthy();
//     expect(headers.get('X-Frontend-Origin')).toBe('vercel-spotly-client');
//   });
// });