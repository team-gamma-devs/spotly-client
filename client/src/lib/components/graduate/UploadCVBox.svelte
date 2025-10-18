<script lang="ts">
    import { GenericBoxVisible } from "../main/utils";
    import BtnGoBack from "../main/utils/BtnGoBack.svelte";
    import { Alert } from "flowbite-svelte";
    import { Label, Fileupload, Button } from "flowbite-svelte";
    import {
        LinkedinSolid,
        UserCircleSolid,
        FileCheckSolid,
        ExclamationCircleSolid,
    } from "flowbite-svelte-icons";
    import { applyAction, enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { ActionData } from "../../../routes/app/graduate/upload_cv/$types";

    // State to track the result of our form actions
    let form!: ActionData;

    // for UI buttons.
    let linkedInLoading = $state(false);
    let personalCvLoading = $state(false);


    // LinkedIn PDF form state
    const linkedInSuccess = $derived(
        form?.linkedin && "success" in form.linkedin && form.linkedin.success,
    );
    const linkedInError = $derived(
        form?.linkedin && "error" in form.linkedin ? form.linkedin.error : null,
    );
    const linkedInMessage = $derived(
        form?.linkedin && "message" in form.linkedin
            ? form.linkedin.message
            : null,
    );

    // Personal CV form state
    const personalCvSuccess = $derived(
        form?.personal && "success" in form.personal && form.personal.success,
    );
    const personalCvError = $derived(
        form?.personal && "error" in form.personal ? form.personal.error : null,
    );
    const personalCvMessage = $derived(
        form?.personal && "message" in form.personal
            ? form.personal.message
            : null,
    );

    // Overall State
    const allFilesUploaded = $derived(linkedInSuccess && personalCvSuccess);

    async function handleSubmit() {
        // All files are uploaded and validated by the server, so we can proceed.
        await goto("/app/dashboard");
    }
</script>

<!-- <GenericBoxVisible>
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
        LINKEDIN PDF
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

        PERSONAL CV PDF
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
        <Button
            color="green"
            class="bg-gray-800 text-white flex items-center justify-center gap-1 my-3 min-w-[120px]"
            onclick={handleSubmit}
            disabled={!filesUploaded()}
            {loading}
            aria-busy={loading}
            >SUBMIT
        </Button>
    </div>
</GenericBoxVisible> -->
<GenericBoxVisible>
    <!-- ... form-header ... -->
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
        <div
            class="flex flex-col md:flex-row items-center md:items-center gap-4 border border-gray-200 dark:border-slate-800 rounded-lg p-4 md:p-5 shadow-sm"
        >
            <div class="items-center m-auto">
                <h3
                    class="text-lg md:text-xl font-semibold text-foreground dark:text-white leading-tight"
                >
                    To continue, please upload
                </h3>
                <p
                    class="mt-1 text-sm text-muted-foreground dark:text-slate-400"
                >
                    Both files are required to proceed.
                </p>

                <ul class="mt-3 grid gap-2 md:gap-1 pl-4">
                    <li class="flex items-start gap-3">
                        <ExclamationCircleSolid
                            class="shrink-0 h-6 w-6 mb-2 text-red-600"
                        />
                        <span
                            class="text-sm text-foreground dark:text-slate-100 pt-1"
                            >LinkedIn-generated PDF</span
                        >
                    </li>
                    <li class="flex items-start gap-3">
                        <ExclamationCircleSolid
                            class="shrink-0 h-6 w-6 text-red-600"
                        />
                        <span
                            class="text-sm text-foreground dark:text-slate-100 pt-1"
                            >Personal CV (PDF or DOCX)</span
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- LINKEDIN PDF FORM -->
    <form
        method="POST"
        action="?/uploadLinkedInPDF"
        enctype="multipart/form-data"
        use:enhance={() => {
            linkedInLoading = true;
            return async ({ result }) => {
                await applyAction(result);
                linkedInLoading = false;
            };
        }}
    >
        <div class="p-2 flex flex-col items-center justify-center">
            <Label class="pb-1 pl-2 w-full">LinkedIn's Generated PDF</Label>
            <div class="inline-file-input flex gap-2">
                <Fileupload
                    name="linkedin_pdf"
                    required
                    disabled={linkedInSuccess}
                />
                <Button
                    type="submit"
                    color="alternative"
                    disabled={linkedInSuccess}
                    loading={linkedInLoading}>Upload</Button
                >
            </div>
            {#if form?.linkedin?.error}
                <Alert color="red" class="mt-2 w-full"
                    >{form.linkedin.error}</Alert
                >
            {/if}
            {#if linkedInSuccess}
                <Alert color="green" class="mt-2 w-full"
                    >{form.linkedin.message}</Alert
                >
            {/if}
        </div>
    </form>

    <!-- PERSONAL CV FORM -->
    <form
        method="POST"
        action="?/uploadPersonalCV"
        enctype="multipart/form-data"
        use:enhance={() => {
            personalCvLoading = true;
            return async ({ result }) => {
                await applyAction(result);
                personalCvLoading = false;
            };
        }}
    >
        <div class="p-2 flex flex-col items-center justify-center">
            <Label class="pb-1 pl-2 w-full">Your Personal CV</Label>
            <div class="inline-file-input flex gap-2">
                <Fileupload
                    name="personal_cv"
                    required
                    disabled={personalCvSuccess}
                />
                <Button
                    type="submit"
                    color="alternative"
                    disabled={personalCvSuccess}
                    loading={personalCvLoading}>Upload</Button
                >
            </div>
            {#if form?.personal?.error}
                <Alert color="red" class="mt-2 w-full"
                    >{form.personal.error}</Alert
                >
            {/if}
            {#if personalCvSuccess}
                <Alert color="green" class="mt-2 w-full"
                    >{form.personal.message}</Alert
                >
            {/if}
        </div>
    </form>

    <!-- FINAL SUBMIT BUTTON -->
    <div class="p-2 flex items-center justify-center">
        <Button
            color="green"
            class="my-3 min-w-[120px]"
            onclick={handleSubmit}
            disabled={!allFilesUploaded}
        >
            Continue
        </Button>
    </div>
</GenericBoxVisible>
