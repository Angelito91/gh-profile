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
        500,
        true,
    );

    const handleClick = (name: string) => {
        user.set(name);
        search = "";
        profiles = [];
    };
</script>

<div
    class="hover:border-slate-400 bg-slate-800/40 border-slate-600 md:w-1/2 relative flex items-center gap-3 p-2 mx-auto mb-5 transition border rounded-lg"
>
    <SearchIcon />
    <input
        class="w-full bg-transparent outline-none"
        type="text"
        on:keyup={() => getSearch()}
        bind:value={search}
    />
    {#if profiles.length > 0}
        <div
            in:fade
            out:fade
            class="-bottom-56 bg-slate-900 absolute left-0 z-10 w-full p-2 rounded-lg shadow"
        >
            {#each profiles as profile}
                <button
                    class="hover:bg-slate-800 flex items-center w-full gap-5 p-2"
                    on:click={() => handleClick(profile.login)}
                >
                    <img
                        class="w-[50px] h-[50px] aspect-square rounded-xl"
                        src={profile.avatar_url}
                        alt={profile.login}
                    />
                    <p class="text-xl font-bold">{profile.login}</p>
                    <p class="text-slate-500 text-xs">{profile.html_url}</p>
                </button>
            {/each}
        </div>
    {/if}
</div>
