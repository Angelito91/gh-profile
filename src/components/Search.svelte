<script lang="ts">
    import { fade } from "svelte/transition";
    import debounce from "just-debounce-it";

    // Stores
    import { user } from "../utils/store";

    // Consts
    import { URL_SEARCH, PARAMS_SEARCH } from "../utils/const";

    // Icons
    import SearchIcon from "./icons/Search.svelte";

    // Types
    import type { Item, Search } from "../types";

    // States
    let search: string = "";
    let profiles: Item[] = [];

    // Get the data of api.github and return the profiles
    const getSearch = debounce(
        async () => {
            if (search.trim().length > 0) {
                console.log("dsa");
                try {
                    const res = await fetch(
                        URL_SEARCH + search + PARAMS_SEARCH,
                    );
                    const data: Search = await res.json();
                    profiles = data.items;
                } catch {
                    profiles = [];
                }
            }
        },
        800,
        true,
    );

    const handleClick = (name: string) => {
        user.set(name);
        search = "";
        profiles = [];
    };
</script>

<div
    class="flex relative transition items-center gap-3 p-2 hover:border-slate-400 bg-slate-800/40 border border-slate-600 rounded-lg md:w-1/2 mx-auto mb-5"
>
    <SearchIcon />
    <input
        class="bg-transparent outline-none w-full"
        type="text"
        on:keyup={() => getSearch()}
        bind:value={search}
    />
    {#if profiles.length > 0}
        <div
            in:fade
            out:fade
            class="absolute w-full left-0 -bottom-56 rounded-lg shadow p-2 bg-slate-900 z-10"
        >
            {#each profiles as profile}
                <button
                    class="flex gap-1 w-full items-center p-2 hover:bg-slate-800"
                    on:click={() => handleClick(profile.login)}
                >
                    <img
                        class="w-[50px] h-[50px] aspect-square rounded-xl"
                        src={profile.avatar_url}
                        alt={profile.login}
                    />
                    <div class="w-full">
                        <p class="text-xl">{profile.login}</p>
                        <a
                            href={profile.html_url}
                            target="_blank"
                            class="transition text-sm text-slate-600 hover:text-white"
                            >{profile.html_url}</a
                        >
                    </div>
                </button>
            {/each}
        </div>
    {/if}
</div>
