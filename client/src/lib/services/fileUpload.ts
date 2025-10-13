


// These will call the server/fileUpload.ts
export async function uploadLinkedInPDF(linkedInFile: File) {
    await new Promise((res) => setTimeout(res, 600));
    return {
        success: true,
        message: 'Mock upload complete',
        fileName: linkedInFile?.name ?? null,
    };
}

export async function uploadUserCV(userCVFile: File) {
    await new Promise((res) => setTimeout(res, 600));
    return {
        success: true,
        message: 'Mock upload complete',
        fileName: userCVFile?.name ?? null,
    };
}