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
    class="hover:border-slate-300/40 bg-midnight/40 border-slate-400/40 md:w-1/2 mb-7 relative flex items-center gap-3 p-2 mx-auto transition border rounded-lg"
>
    <SearchIcon />
    <input
        class="w-full bg-transparent outline-none"
        type="search"
        placeholder="name of profile .."
        on:keyup={() => getSearch()}
        bind:value={search}
    />
    
    {#if profiles.length > 0 && search.length > 0}
        <div in:fade out:fade class="-bottom-[4.5rem] absolute flex items-center justify-center w-full gap-5">
            {#each profiles as profile}
                <button
                    class="hover:scale-110 rounded-xl flex items-center gap-3 p-2"
                    on:click={() => handleClick(profile.login)}
                >
                    <img
                        class="w-[50px] h-[50px] aspect-square rounded-xl"
                        src={profile.avatar_url}
                        alt={profile.login}
                    />
                    <p class="text-nowrap text-ellipsis text-xl">
                        {profile.login}
                    </p>
                </button>
            {/each}
        </div>
    {/if}
</div>
