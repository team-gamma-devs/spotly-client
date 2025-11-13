// This file client/src/routes/app/graduate/upload_cv/+page.server.ts

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
import { dev } from '$app/environment';

/*
MAX_PDF_SIZE=2

MAX_CSV_SIZE=1

MAX_IMG_SIZE=1
*/

const MAX_PDF_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_IMG_SIZE = 1 * 1024 * 1024; // 1MB

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
    isOptional: boolean = false,
    maxBytes: number
): string | null {
	if (!file || file.size === 0) {
		if (isOptional) {
			return null;
		}
		return `${fieldName} is required.`;
	}

    if (file.size > maxBytes) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const maxMB = (maxBytes / (1024 * 1024)).toFixed(0);
        return `File is too large (${sizeMB}MB). Maximum size is ${maxMB}MB.`;
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

    const linkedinError = validateFile(linkedinPdf, ['pdf'], 'LinkedIn PDF', false, MAX_PDF_SIZE);
		if (linkedinError) {
			validationErrors.linkedin = linkedinError;
		}

    const personalError = validateFile(personalCv, ['pdf', 'docx'], 'Personal CV', false, MAX_PDF_SIZE);
		if (personalError) {
			validationErrors.personal = personalError;
		}

    const avatarError = validateFile(avatar, ['jpg', 'jpeg', 'png'], 'Avatar', true, MAX_IMG_SIZE);
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

			const jwtToken = cookies.get('access_token');

			if (!jwtToken) {
				return fail(401, {
					error: 'Authentication required. Please log in again.',
					success: false,
				});
			}

			const backendFormData = new FormData();

			if (linkedinPdf) {
				backendFormData.append('linkedin_cv', linkedinPdf);
			}
			if (personalCv) {
				backendFormData.append('personal_cv', personalCv);
			}
			if (avatar) {
				backendFormData.append('avatar_img', avatar);
			}

			// If the user has connected their GitHub account, add the username to the form data.
			backendFormData.append('github_username', cookies.get('github_username') || '');

			if (dev) {
				console.log('Sending request with JWT');
				console.log('FormData fields:', Array.from(backendFormData.keys()));
			}

			const response = await signedMultipartFetch(url.toString(), {
				method: 'POST',
				body: backendFormData,
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

			return {
				success: true,
				message: responseData.message,
			};
		} catch (error: any) {
			console.error('Error uploading files:', error);

			if (error.cause?.code === 'ECONNREFUSED') {
				return fail(503, {
					error: 'Upload service is not available. Contact Federico Paganini or the support team.',
					success: false,
				});
			}

			return fail(500, {
				error: 'Could not connect to upload service. Contact Federico Paganini or the support team.',
				success: false,
			});
		}
	}
}