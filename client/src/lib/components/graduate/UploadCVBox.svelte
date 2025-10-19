<script lang="ts">
    import { GenericBoxVisible } from "../main/utils";
    import BtnGoBack from "../main/utils/BtnGoBack.svelte";
    import { Alert } from "flowbite-svelte";
    import { Label, Fileupload, Button } from "flowbite-svelte";
    import {
        ExclamationCircleSolid,
        CheckCircleSolid,
    } from "flowbite-svelte-icons";
    import { applyAction, enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { ActionData } from "../../../routes/app/graduate/upload_cv/$types";
    import { page } from "$app/state";

    let { form = $bindable() }: { form: ActionData } = $props();
    let isLoading = $state(false);

    // Derived states for validation errors
    const linkedInError = $derived(
        form?.validation?.linkedin ? form.validation.linkedin : null,
    );
    const personalCvError = $derived(
        form?.validation?.personal ? form.validation.personal : null,
    );
    const generalError = $derived(form?.error ? form.error : null);
    const uploadSuccess = $derived(form?.success === true);
    const magicToken = $derived(page.url.searchParams.get("token")); // This holds the magic link token.
    /**
     * Navigates the user to the dashboard upon successful upload.
     * This is triggered by the "Continue" button after success.
     */
    async function handleContinue() {
        await goto("/app/graduate");
    }
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
        <div
            class="flex flex-col md:flex-row items-center md:items-center gap-4 border
                    border-gray-200 dark:border-slate-800 rounded-lg p-4 md:p-5 shadow-sm"
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
                    Both files are required to proceed. Max size: 3MB per file.
                </p>

                <ul class="mt-3 grid gap-2 md:gap-1 pl-4">
                    <li class="flex items-start gap-3">
                        {#if uploadSuccess}
                            <CheckCircleSolid
                                class="shrink-0 h-6 w-6 mb-2 text-green-600"
                            />
                        {:else}
                            <ExclamationCircleSolid
                                class="shrink-0 h-6 w-6 mb-2 text-red-600"
                            />
                        {/if}
                        <span
                            class="text-sm text-foreground dark:text-slate-100 pt-1"
                        >
                            LinkedIn-generated PDF
                        </span>
                    </li>
                    <li class="flex items-start gap-3">
                        {#if uploadSuccess}
                            <CheckCircleSolid
                                class="shrink-0 h-6 w-6 text-green-600"
                            />
                        {:else}
                            <ExclamationCircleSolid
                                class="shrink-0 h-6 w-6 text-red-600"
                            />
                        {/if}
                        <span
                            class="text-sm text-foreground dark:text-slate-100 pt-1"
                        >
                            Personal CV (PDF or DOCX)
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <form
        method="POST"
        action="?/uploadFiles"
        enctype="multipart/form-data"
        use:enhance={() => {
            isLoading = true;
            return async ({ result }) => {
                await applyAction(result);
                isLoading = false;
            };
        }}
    >
    <!-- This hidden input sends the magic link from the url -->
        <input type="hidden" name="magic_token" value={magicToken} /> 
        <div class="p-2 flex flex-col items-center justify-center">
            <Label class="pb-1 pl-2 w-full">LinkedIn's Generated PDF</Label>
            <div class="inline-file-input flex gap-2 w-full">
                <Fileupload
                    name="linkedin_pdf"
                    required
                    disabled={uploadSuccess}
                    accept=".pdf"
                />
            </div>
            {#if linkedInError}
                <Alert color="red" class="mt-2 w-full">
                    <span class="font-semibold">LinkedIn PDF:</span>
                    {linkedInError}
                </Alert>
            {/if}
        </div>

        <div class="p-2 flex flex-col items-center justify-center">
            <Label class="pb-1 pl-2 w-full">Your Personal CV</Label>
            <div class="inline-file-input flex gap-2 w-full">
                <Fileupload
                    name="personal_cv"
                    required
                    disabled={uploadSuccess}
                    accept=".pdf,.docx"
                />
            </div>
            {#if personalCvError}
                <Alert color="red" class="mt-2 w-full">
                    <span class="font-semibold">Personal CV:</span>
                    {personalCvError}
                </Alert>
            {/if}
        </div>

        <!-- General error message -->
        {#if generalError}
            <div class="p-2">
                <Alert color="red" class="w-full">{generalError}</Alert>
            </div>
        {/if}

        <!-- Success message -->
        {#if uploadSuccess}
            <div class="p-2">
                <Alert color="green" class="w-full">
                    Both files uploaded successfully!
                </Alert>
            </div>
        {/if}

        <div class="p-2 flex items-center justify-center gap-3">
            <!-- Real shit, don't delete -->
            <!-- {#if !uploadSuccess}
                <Button
                    type="submit"
                    color="blue"
                    class="my-3 min-w-[120px]"
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Upload Files
                </Button>
            {:else}
                <Button
                    color="green"
                    class="my-3 min-w-[120px]"
                    onclick={handleContinue}
                >
                    Continue
                </Button>
            {/if} -->
            <!-- DEBUG ONLY! -->
            <Button
                color="green"
                class="my-3 min-w-[120px]"
                onclick={handleContinue}
            >
                Continue
            </Button>
        </div>
    </form>
</GenericBoxVisible>
