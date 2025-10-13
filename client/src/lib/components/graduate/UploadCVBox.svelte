<script lang="ts">
    import { GenericBoxVisible } from "../main/utils";
    import BtnGoBack from "../main/utils/BtnGoBack.svelte";
    import { Label, Fileupload, Button } from "flowbite-svelte";
    import { LinkedinSolid, UserCircleSolid, FileCheckSolid, ExclamationCircleSolid } from "flowbite-svelte-icons";
    import { uploadLinkedInPDF, uploadUserCV } from "$lib/services/fileUpload";

    let linkedInFileDrop = {
        // Here is the file controlled, I don't yet know how to handle it :D
        id: "user_linkedin_pdf",
    };
    let userCVFileDrop = {
        id: "user_cv",
    };

    let loading = $state(false);
    let linkedInFileSuccess = $state(false);
    let userCVFileSuccess = $state(false);

    // filesUploaded becomes true when both linkedInFileSuccess and userCVFileSuccess are tru
    // When filesUploaded is true, the submit button is activated
    let filesUploaded = $derived(() => linkedInFileSuccess && userCVFileSuccess);


    async function handleLinkedInSubmit() {
        if (loading) return;
        loading = true;
        // await uploadLinkedInPDF(linkedInFileDrop);
        loading = false;
        linkedInFileSuccess = true;
        console.log(`File ${linkedInFileDrop}`);
    }
    async function handleUserCVSubmit() {
        if (loading) return;
        loading = true;
        // await uploadUserCV(userCVFileDrop);
        loading = false;
        userCVFileSuccess = true;
    }
    async function handleSubmit() {}
</script>

<GenericBoxVisible>
    <div
        id="form-header"
        class="w-full p-2 gap-3 flex items-center justify-between mb-2"
    >
        <h1 class="text-xl">Upload Files</h1>
        <BtnGoBack
            classes="hidden md:block md:flex md:items-center md:justify-center"
        />
    </div>
    <div class="w-full max-w-3xl mx-5 my-4">
        <div class="flex flex-col md:flex-row items-center md:items-center gap-4 border border-gray-200 dark:border-slate-800 rounded-lg p-4 md:p-5 shadow-sm">
            <!-- <div class="flex-none">
                <div class="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div> -->

            <div class="items-center m-auto">
                <h3 class="text-lg md:text-xl font-semibold text-foreground dark:text-white leading-tight">To continue, please upload</h3>
                <p class="mt-1 text-sm text-muted-foreground dark:text-slate-400">Both files are required to proceed.</p>

                <ul class="mt-3 grid gap-2 md:gap-1 pl-4">
                    <li class="flex items-start gap-3">
                        <ExclamationCircleSolid class="shrink-0 h-6 w-6 mb-2 text-red-600" />
                        <span class="text-sm text-foreground dark:text-slate-100 pt-1">LinkedIn-generated PDF</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <ExclamationCircleSolid class="shrink-0 h-6 w-6 text-red-600" />
                        <span class="text-sm text-foreground dark:text-slate-100 pt-1">Personal CV (PDF or DOCX)</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div id="form-body" class=" p-2 flex flex-col items-center justify-center">
        <Label class="pb-1 pl-2 w-full">
            <LinkedinSolid class="inline mb-1 mr-0.5" />
                LinkedIn's Generated PDF
            </Label>
        <div class="inline-file-input flex gap-2">
            <Fileupload {...linkedInFileDrop} />
            <Button color="alternative"
                onclick={handleLinkedInSubmit}
                disabled={linkedInFileSuccess}>Upload
            </Button>
        </div>

        <a
            href="https://www.linkedin.com/help/linkedin/answer/a541960"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full pt-2 pr-2 text-sm text-foreground dark:text-gray-500 hover:text-blue-800
            dark:text-blue-300 dark:hover:text-blue-200 underline decoration-1 underline-offset-2 transition-colors block text-right"
            >How To Generate LinkedIn's PDF</a
        >
        <Label class="pb-1 pl-2 w-full"
            ><UserCircleSolid class="inline mb-0.5 mr-1" />Your Personal CV</Label
        >
        <div class="inline-file-input flex gap-2">
            <Fileupload {...userCVFileDrop} />
            <Button color="alternative"
                onclick={handleUserCVSubmit}
                disabled={userCVFileSuccess}>Upload
            </Button>
        </div>
        <p class="w-full text-right pt-2 pr-2 text-sm text-gray-500">
            (.pdf .docx)
        </p>
        <!-- Submit button stays disabled until both files are correctly uploaded -->
        <Button
            color="green"
            class="bg-gray-800 text-white flex items-center justify-center gap-1 my-3 min-w-[120px]"
            onclick={handleSubmit}
            disabled={!filesUploaded()}
            {loading}
            aria-busy={loading}
            >Submit
        </Button>
    </div>
</GenericBoxVisible>
