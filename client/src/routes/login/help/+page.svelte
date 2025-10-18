<script>
    import BtnGoBack from "$lib/components/main/utils/BtnGoBack.svelte";
</script>

<section
    class="w-full bg-white dark:bg-background blur-bg border border-gray-200 dark:border-slate-800 rounded-lg shadow-md max-w-[720px] mx-auto my-auto p-6 m-5 sm:p-8 text-slate-800 dark:text-slate-100 leading-relaxed"
    aria-label="Lost my Holberton Account"
>
    <div class="w-full flex justify-between items-center mb-3">
        <h2
            id="how-it-works-title"
            class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100"
        >
            Lost my Holberton account.
        </h2>
        <BtnGoBack
            targetUrl="http://localhost:5173/login"
            classes="cursor-pointer"
        />
    </div>
    <div id="hr" class="w-full h-[1px] bg-primary-700 my-5"></div>
    <article>
        In case you lost your Holberton you must contact Holberton staff at: <strong>*911</strong>
    </article>
</section>
