import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedMultipartFetch } from '$lib/server/authFetch';
import { dev } from '$app/environment';

const CSV_HEADERS = 'first_name,last_name,cohort,email';
const MAX_NAME_LENGTH = 50;
const MAX_FILE_SIZE = 1 * 1024 * 1024;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles CSV file upload for graduate invitations.
 * 
 * This endpoint validates the CSV file format and content before forwarding
 * to the backend for processing. Performs double validation (client + server)
 * to reduce backend load.
 * 
 * @validation
 * - File must be .csv extension
 * - File size must be under 1MB
 * - Headers must match: first_name,last_name,cohort,email
 * - First/last names: non-empty strings, max 50 characters
 * - Cohort: non-negative integer
 * - Email: valid email format
 * 
 * @returns Success response with row count or detailed error message
 * 
 * @example
 * CSV Format:
 * ```
 * first_name,last_name,cohort,email
 * John,Doe,25,john.doe@example.com
 * Jane,Smith,26,jane.smith@example.com
 * ```
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const token = cookies.get('access_token');
    if (!dev) {
      if (!token) {
        return json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }
    } else {
      if (dev) console.log("Access Token: " + token);
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      return json(
        { error: 'File must be a CSV file' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return json(
        { error: 'File size must be less than 1MB' },
        { status: 413 }
      );
    }

    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      return json(
        { error: 'CSV file is empty' },
        { status: 400 }
      );
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    if (dev) {
      console.log("headers: " + headers);
      console.log("lines: " + lines);
    }

    if (headers.join(',') !== CSV_HEADERS) {
      return json(
        { error: 'Invalid CSV Headers' },
        { status: 400 }
      );
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      if (values.length !== 4) {
        return json(
          { error: `Row ${i}: Invalid number of columns. Expected 4, got ${values.length}` },
          { status: 400 }
        );
      }

      const [firstName, lastName, cohort, email] = values;

      if (!firstName || firstName.length === 0) {
        return json(
          { error: `Row ${i}: First name is required` },
          { status: 400 }
        );
      }
      if (firstName.length > MAX_NAME_LENGTH) {
        return json(
          { error: `Row ${i}: First name must be ${MAX_NAME_LENGTH} characters or less` },
          { status: 400 }
        );
      }
      if (!lastName || lastName.length === 0) {
        return json(
          { error: `Row ${i}: Last name is required` },
          { status: 400 }
        );
      }
      if (lastName.length > MAX_NAME_LENGTH) {
        return json(
          { error: `Row ${i}: Last name must be ${MAX_NAME_LENGTH} characters or less` },
          { status: 400 }
        );
      }

      const cohortNum = Number(cohort);
      if (isNaN(cohortNum) || !Number.isInteger(cohortNum) || cohortNum < 0) {
        return json(
          { error: `Row ${i}: Cohort must be a non-negative integer` },
          { status: 400 }
        );
      }

      if (!email || !EMAIL_REGEX.test(email)) {
        return json(
          { error: `Row ${i}: Invalid email format` },
          { status: 400 }
        );
      }
    }

    const backendFormData = new FormData();
    backendFormData.append('file', file);

    if (dev) {
      // ******* DEBUG INTERCEPT ********
      console.log("BACKEND PAYLOAD:", backendFormData.get('file'));
      console.log("All validations passed, cleared for backend upload.");
      console.log('[PROJECT_NEMESIS]: [INITIALIZE]');
      return json(
        { message: 'Successfully validated', rowCount: lines.length - 1 },
        { status: 200 }
      );
    }
    // *********** Actual backend upload ************
    const response = await signedMultipartFetch(
      `${BACKEND_URL}/manager/uploadCSV`,
      {
        method: 'POST',
        body: backendFormData,
      },
      token
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      if (dev) console.error('Backend error:', response.status, errorText);

      let errorMessage = 'Failed to upload CSV';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.detail || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }

      return json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (dev) console.log('CSV uploaded successfully:', result);

    return json(result);
  } catch (error: any) {
    if (dev) console.error('CSV upload error:', error);
    return json(
      { error: error.message || 'Failed to upload CSV' },
      { status: 500 }
    );
  }
};