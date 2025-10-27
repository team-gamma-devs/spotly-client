import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { signedMultipartFetch } from '$lib/server/authFetch';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

interface ValidationErrors {
	linkedin?: string;
	personal?: string;
	avatar?: string;
}
/**
 * Validates an uploaded file against size and allowed file extensions/MIME types.
 *
 * @param {File | null} file - The file object from the FormData, or null if missing.
 * @param {string[]} allowedTypes - An array of allowed file extensions (e.g., ['pdf', 'docx']).
 * @param {string} fieldName - A human-readable name for the field (e.g., 'LinkedIn PDF').
 * @param {boolean} isOptional - Whether the file is optional (default: false).
 * @returns {string | null} An error message string if validation fails, or null if validation passes.
 */
function validateFile(file: File | null, allowedTypes: string[], fieldName: string, isOptional: boolean = false): string | null {
	if (!file || file.size === 0) {
		if (isOptional) {
			return null;
		}
		return `${fieldName} is required.`;
	}

	if (file.size > MAX_FILE_SIZE) {
		const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
		return `File is too large (${sizeMB}MB). Maximum size is 3MB.`;
	}

	const fileExtension = file.name.split('.').pop()?.toLowerCase();
	if (!fileExtension || !allowedTypes.includes(fileExtension)) {
		return `Invalid file type. Allowed types: ${allowedTypes.join(', ').toUpperCase()}`;
	}

	// 1 case per format.
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
 * Defines the form actions available for file uploads.
 *
 * @type {import('@sveltejs/kit').Actions}
 */
export const actions: Actions = {
	uploadFiles: async ({ request, cookies }) => {
		const formData = await request.formData();
		const linkedinPdf = formData.get("linkedin_pdf") as File | null;
		const personalCv = formData.get("personal_cv") as File | null;
		const avatar = formData.get("avatar") as File | null;
		// const magicToken = formData.get("magic_token") as string | null;
		const magicToken = "I'm magic Johnson!";
		console.log("I'm Inside!!");
		console.log("*************** FormData Contents *********");
		console.log("Magic Token:", magicToken);
		console.log("LinkedIn PDF:", linkedinPdf ? {
			name: linkedinPdf.name,
			size: linkedinPdf.size,
			type: linkedinPdf.type
		} : "NOT PROVIDED");
		console.log("Personal CV:", personalCv ? {
			name: personalCv.name,
			size: personalCv.size,
			type: personalCv.type
		} : "NOT PROVIDED");
		console.log("Avatar:", avatar ? {
			name: avatar.name,
			size: avatar.size,
			type: avatar.type
		} : "NOT PROVIDED");
		console.log("***********");

		const validationErrors: ValidationErrors = {};

		const linkedinError = validateFile(linkedinPdf, ['pdf'], 'LinkedIn PDF');
		if (linkedinError) {
			validationErrors.linkedin = linkedinError;
			console.log('error: ' + linkedinError);
		}

		const personalError = validateFile(personalCv, ['pdf', 'docx'], 'Personal CV');
		if (personalError) {
			validationErrors.personal = personalError;
		}

		const avatarError = validateFile(avatar, ['jpg', 'jpeg', 'png'], 'Avatar', true);
		if (avatarError) {
			validationErrors.avatar = avatarError;
		}

		// if there are any error, I'll return them for the UI.
		if (Object.keys(validationErrors).length > 0) {
			return fail(400, {
				validation: validationErrors,
				success: false,
			});
		}

		if (!magicToken) {
			return fail(401, { error: 'Authentication token is missing. Please refresh and try again.' });
		}

		try {
			const url = new URL(`${BACKEND_URL}/sign-up`);
			url.searchParams.append('token', magicToken);

			console.log('=== Sending to backend ===');
			console.log('URL:', url.toString());
			console.log('FormData keys:', Array.from(formData.keys()));

			const response = await signedMultipartFetch(url.toString(), {
				method: 'POST',
				body: formData,
			});

			console.log('=== Backend response ===');
			console.log('Status:', response.status);
			console.log('OK:', response.ok);

			if (!response.ok) {
				const errorData = await response.json();
				console.log('Error data:', errorData);
				return fail(response.status, {
					error: errorData.detail || 'Upload failed. Please try again.',
					success: false,
				});
			}
			const responseData = await response.json();
			console.log('Success response:', responseData);
			const jwt = responseData.accessToken; // Aliased to camel case.

			cookies.set('spotly_session', jwt, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7, // 1 week
			});

			return {
				success: true,
				message: 'Files uploaded successfully!',
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
	},
};