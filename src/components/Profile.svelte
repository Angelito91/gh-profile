<script lang="ts">
    import { fade } from "svelte/transition";

    // Consts
    import { URL_USER } from "../utils/const";

    // Stores
    import { user } from "../utils/store";

    // Types
    import type { Profile } from "../types";

    // Get the data of api.github and return the profile
    const getProfile = async ({ user }: { user: String }) => {
        const res = await fetch(URL_USER + user);
        const data: Profile = await res.json();
        return data;
    };
</script>

{#await getProfile({ user: $user })}
    <p class="text-center text-xl text-slate-500 my-2">
        Loading the profile ...
    </p>
{:then profile}
    <div in:fade out:fade class="flex items-center gap-10">
        <img
            class="w-[150px] h-[150px] aspect-square rounded-full p-2"
            src={profile.avatar_url}
            alt={profile.name}
        />
        <p class="rounded-lg text-center text-slate-500 bg-slate-800/40 p-3">
            Followers <span
                class="text-white font-bold border-l border-slate-600 ml-1 px-2"
                >{profile.followers}</span
            >
        </p>
        <p class="rounded-lg text-center text-slate-500 bg-slate-800/40 p-3">
            Following <span
                class="text-white font-bold border-l border-slate-600 ml-1 px-2"
                >{profile.following}</span
            >
        </p>
        <p class="rounded-lg text-center text-slate-600 bg-slate-800/40 p-3">
            Repos <span
                class="text-white font-bold border-l border-slate-600 ml-1 px-2"
                >{profile.public_repos}</span
            >
        </p>
        <p class="rounded-lg text-center text-slate-500 bg-slate-800/40 p-3">
            Location <span
                class="text-white text-sm font-bold border-l border-slate-600 ml-1 px-2"
                >{profile.location}</span
            >
        </p>
    </div>
    <div class="my-3">
        <h2 class="text-2xl mb-2">{profile.name}</h2>
        <h3 class="text-sm text-slate-500">{profile.bio}</h3>
    </div>
{:catch}
    <p class="text-center text-xl text-red-300 my-2">error loading pro...</p>
{/await}
