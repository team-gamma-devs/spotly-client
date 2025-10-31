/**
 * @fileoverview Server-side form actions for CV file uploads.
 * Handles validation, file size checks, and communication with the backend API.
 * 
 * @module routes/app/graduate/upload_cv/+page.server
 */

import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedMultipartFetch } from '$lib/server/authFetch';
import { supabase } from '$lib/services/supabaseClient';
import { signedJsonFetch } from '$lib/server/authFetch';

/*
MAX_PDF_SIZE=2

MAX_CSV_SIZE=1

MAX_IMG_SIZE=1
*/

const MAX_PDF_SIZE = 2 * 1024 * 1024;
const MAX_IMG_SIZE = 1;

/**
 * Validation error messages for each upload field.
 */
interface ValidationErrors {
	/** Error message for LinkedIn PDF validation */
	linkedin?: string;
	/** Error message for Personal CV validation */
	personal?: string;
	/** Error message for Avatar validation */
	avatar?: string;
}

/**
 * Validates an uploaded file against size constraints and allowed file types.
 * Checks both file extension and MIME type to ensure file integrity.
 * 
 * @param file - The file object from FormData, or null if not provided
 * @param allowedTypes - Array of allowed file extensions (e.g., ['pdf', 'docx'])
 * @param fieldName - Human-readable field name for error messages
 * @param isOptional - Whether the file is optional (default: false)
 * @returns Error message if validation fails, null if validation passes
 * 
 * @example
 * ```ts
 * const error = validateFile(pdfFile, ['pdf'], 'LinkedIn PDF');
 * if (error) {
 *   // Handle validation error
 * }
 * ```
 */
function validateFile(
	file: File | null,
	allowedTypes: string[],
	fieldName: string,
	isOptional: boolean = false
): string | null {
	if (!file || file.size === 0) {
		if (isOptional) {
			return null;
		}
		return `${fieldName} is required.`;
	}

	if (file.size > MAX_) {
		const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
		return `File is too large (${sizeMB}MB). Maximum size is 3MB.`;
	}

	const fileExtension = file.name.split('.').pop()?.toLowerCase();
	if (!fileExtension || !allowedTypes.includes(fileExtension)) {
		return `Invalid file type. Allowed types: ${allowedTypes.join(', ').toUpperCase()}`;
	}

	const allowedMimeTypes = allowedTypes
		.map((ext) => {
			switch (ext) {
				case 'pdf':
					return String('application/pdf'); // Don't understand why it complains if I don't convert to string.
				case 'docx':
					return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
				case 'jpg':
				case 'jpeg':
					return 'image/jpeg';
				case 'png':
					return 'image/png';
				default:
					return '';
			}
		})
		.filter(Boolean);

	if (!allowedMimeTypes.includes(file.type)) {
		return `Invalid file format. Please upload a valid ${allowedTypes.join(' or ').toUpperCase()} file.`;
	}

	return null;
}

/**
 * Form actions for handling file uploads during graduate onboarding.
 * Validates files client-side, then forwards them to the backend API.
 */
export const actions: Actions = {
	/**
	 * Handles the file upload form submission.
	 * Validates all files, sends them to the backend, and sets authentication cookie on success.
	 * 
	 * @param request - The incoming form request
	 * @param cookies - Cookie management utilities
	 * @returns Success response with message, or failure with validation errors
	 * 
	 * @throws {400} Validation errors for one or more files
	 * @throws {401} Missing authentication token
	 * @throws {503} Backend service unavailable
	 * @throws {500} General server error
	 */
	uploadFiles: async ({ request, cookies }) => {
		const formData = await request.formData();
		const linkedinPdf = formData.get("linkedin_pdf") as File | null;
		const personalCv = formData.get("personal_cv") as File | null;
		const avatar = formData.get("avatar") as File | null;

		const validationErrors: ValidationErrors = {};

		const linkedinError = validateFile(linkedinPdf, ['pdf'], 'LinkedIn PDF');
		if (linkedinError) {
			validationErrors.linkedin = linkedinError;
		}

		const personalError = validateFile(personalCv, ['pdf', 'docx'], 'Personal CV');
		if (personalError) {
			validationErrors.personal = personalError;
		}

		const avatarError = validateFile(avatar, ['jpg', 'jpeg', 'png'], 'Avatar', true);
		if (avatarError) {
			validationErrors.avatar = avatarError;
		}

		if (Object.keys(validationErrors).length > 0) {
			return fail(400, {
				validation: validationErrors,
				success: false,
			});
		}

		try {
			const url = new URL(`${BACKEND_URL}/sign-up/`);

			// Get JWT token from cookies
			const jwtToken = cookies.get('access_token');

			if (!jwtToken) {
				return fail(401, {
					error: 'Authentication required. Please log in again.',
					success: false,
				});
			}

			// Create NEW FormData with field names matching FastAPI endpoint
			const backendFormData = new FormData();

			// Map frontend field names to backend field names
			if (linkedinPdf) {
				backendFormData.append('linkedin_cv', linkedinPdf);  // linkedin_pdf → linkedin_cv
			}

			if (personalCv) {
				backendFormData.append('personal_cv', personalCv);  // Same name
			}

			if (avatar) {
				backendFormData.append('avatar_img', avatar);  // avatar → avatar_img
			}

			// Optional: Add github_username if you collect it
			// backendFormData.append('github_username', '');

			console.log('[uploadFiles] Sending request with JWT');
			console.log('[uploadFiles] FormData fields:', Array.from(backendFormData.keys()));

			const response = await signedMultipartFetch(url.toString(), {
				method: 'POST',
				body: backendFormData,  // Use the rebuilt FormData
				headers: {
					'Authorization': `Bearer ${jwtToken}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.log('Error data:', errorData);
				return fail(response.status, {
					error: errorData.detail || 'Upload failed. Please try again.',
					success: false,
				});
			}

			const responseData = await response.json();

			const userFull = await signedJsonFetch(`${BACKEND_URL}/auth/me/full_user`);


			supabase.auth.setSession
			/**
			 * /auth/me/full_user response
{
"id": "string",
"firstName": "string",
"lastName": "string",
"email": "user@example.com",
"avatar_url": "http://example.com",
"cohort": 0,
"github": "string",
"cvInfo": {
"personalCvUrl": "http://example.com",
"linkedinUrl": "http://example.com",
"skills": [
"string"
],
"englishLevel": "string",
"worksInIt": true,
"lastUpdate": "2019-08-24T14:15:22Z"
},
"tutorsFeedback": [
{
"id": "string",
"tutorId": "string",
"tutorName": "string",
"professionalScore": "string",
"technicalScore": "string",
"annotation": "string",
"created_at": "2019-08-24T14:15:22Z"
}
],
"role": "string",
"created_at": "2019-08-24T14:15:22Z",
"updated_at": "2019-08-24T14:15:22Z"
}
			*/

			return {
				success: true,
				message: responseData.message,
			};
		} catch (error: any) {
			console.error('Error uploading files:', error);

			if (error.cause?.code === 'ECONNREFUSED') {
				return fail(503, {
					error: 'Upload service is not available. Please try again later.',
					success: false,
				});
			}

			return fail(500, {
				error: 'Could not connect to upload service. Please try again.',
				success: false,
			});
		}
	}
}