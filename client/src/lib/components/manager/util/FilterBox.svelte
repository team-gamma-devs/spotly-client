<script lang="ts">
    import { Label, Input, Select, Radio, MultiSelect } from "flowbite-svelte";
    export let selectedFilter: string = "";

    let selectedEnglishLevel: string = "";
    let multiSelectedTutors: string[] = [];

    let levels: { value: string; name: string }[] = [
        { value: "advanced", name: "Advanced" },
        { value: "intermediate", name: "Intermediate" },
        { value: "basic", name: "Basic" }
    ];
    let tutorsList: { value: string; name: string }[] = [
        { value: "jav_val", name: "Javier Valenziani" },
        { value: "ign_cap", name: "Ignacio Capezzolo" },
        { value: "enr_igl", name: "Enrique Iglesias" },
        { value: "mar_mar", name: "Martin Marrero" },
        { value: "fed_pag", name: "Federico Paganini" }
    ];
    const applyFullHeightToBitchElement = () => {
        const el = document.querySelector('#this-element-is-a-bitch');
        if (el?.parentElement) {
            el.parentElement.classList.add("h-full");
        }
    }

</script>

<Label for="default-input" class="mb-2 block">
    Select {selectedFilter ? selectedFilter : "Filter"}
</Label>
{#if selectedFilter == "Technologies"}
    <Input id="default-input" placeholder="Enter Keyword" />
{:else if selectedFilter == "English Level"}
    <Select class="mt-2" items={levels} bind:value={selectedEnglishLevel} />
{:else if selectedFilter == "Feedback"}
    <MultiSelect items={tutorsList} bind:value={multiSelectedTutors} onclick={applyFullHeightToBitchElement}/>
{/if}