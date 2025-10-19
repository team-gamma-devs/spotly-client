<script lang="ts">
    import { Label, Input, Select, Radio, MultiSelect } from "flowbite-svelte";

    let {
        techKeyword = $bindable(),
        selectedFilter,
        multiSelectedEnglishLevel = $bindable(),
        multiSelectedTutors = $bindable(),
    } = $props();

    let englishLevels: { value: string; name: string }[] = [
        { value: "advanced", name: "Advanced" },
        { value: "intermediate", name: "Intermediate" },
        { value: "basic", name: "Basic" },
    ];

    let tutorsList: { value: string; name: string }[] = [
        { value: "jav_val", name: "Javier Valenziani" },
        { value: "ign_cap", name: "Ignacio Capezzolo" },
        { value: "enr_igl", name: "Enrique Iglesias" },
        { value: "mar_mar", name: "Martin Marrero" },
        { value: "fed_pag", name: "Federico Paganini" },
    ];

    const applyFullHeightToBitchElement = () => {
        const el = document.querySelector("#this-element-is-a-bitch");
        if (el?.parentElement) {
            el.parentElement.classList.add("h-full");
        }
    };
</script>

<Label for="default-input" class="mb-2 block">
    Select {selectedFilter ? selectedFilter : "Filter"}
</Label>

{#if selectedFilter == "Technologies"}
    <Input
        id="technologies-text-input"
        placeholder="Enter Keyword"
        bind:value={techKeyword}
    />
{:else if selectedFilter == "English Level"}
    <MultiSelect items={englishLevels} bind:value={multiSelectedEnglishLevel} />
{:else if selectedFilter == "Feedback"}
    <MultiSelect
        items={tutorsList}
        bind:value={multiSelectedTutors}
        onclick={applyFullHeightToBitchElement}
    />
{/if}
