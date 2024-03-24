<script lang="ts">
    import { fade } from "svelte/transition";
    // Consts
    import { URL } from "../utils/const";

    // Stores
    import { user } from "../utils/store";

    // Types
    import type { Profile } from "../types";

    // Icons
    import WebIcon from "./icons/Web.svelte";

    // Utils
    import { convertNumber } from "../utils/convertNumber";

    // Get the data of api.github and return the profile
    const getProfile = async ({ user }: { user: String }) => {
        const res = await fetch(URL + user);
        const data: Profile = await res.json();
        return data;
    };
</script>

{#await getProfile({ user: $user })}
    <p class="text-slate-500 my-2 text-xl text-center">
        Loading the profile ...
    </p>
{:then profile}
    <div
        transition:fade
        class="md:flex-row flex flex-col items-center gap-10"
    >
        <img
            class="mx-auto md:mx-0 w-[150px] h-[150px] aspect-square rounded-full p-2"
            src={profile.avatar_url}
            alt={profile.name}
        />
        <div class="md:gap-10 flex flex-wrap items-center justify-center gap-5">
            <p
                class="md:text-md text-rose-400 hover:shadow hover:shadow-slate-600/40 border-slate-600/40 p-3 text-sm text-center transition border rounded-lg"
            >
                Followers <span
                    class="border-slate-400 px-2 ml-1 font-bold text-white border-l"
                    >{convertNumber(profile.followers)}</span
                >
            </p>
            <p
                class="md:text-md hover:shadow hover:shadow-slate-600/40 border-slate-600/40 p-3 text-sm text-center text-purple-400 transition border rounded-lg"
            >
                Following <span
                    class="border-slate-400 px-2 ml-1 font-bold text-white border-l"
                    >{convertNumber(profile.following)}</span
                >
            </p>
            <p
                class="md:text-md hover:shadow hover:shadow-slate-600/40 border-slate-600/40 p-3 text-sm text-center text-green-400 transition border rounded-lg"
            >
                Repos <span
                    class="border-slate-400 px-2 ml-1 font-bold text-white border-l"
                    >{profile.public_repos}</span
                >
            </p>
            <p
                class="md:text-md text-sky-400 hover:shadow hover:shadow-slate-600/40 border-slate-600/40 p-3 text-sm text-center transition border rounded-lg"
            >
                Location <span
                    class="border-slate-300 px-2 ml-1 text-sm font-bold text-white border-l"
                    >{profile.location || "none"}</span
                >
            </p>
        </div>
    </div>
    <div class="my-5">
        <h2 class="flex items-center gap-5 mb-2 text-2xl">
            {profile.name}
            <a
                class="hover:opacity-100 transition opacity-50"
                target="_blank"
                href={profile.html_url}
            >
                <WebIcon />
            </a>
        </h2>
        <h3 class="text-slate-400 text-sm">{profile.bio || "no bio"}</h3>
    </div>
{:catch}
    <p class="my-2 text-xl text-center text-red-300">
        error loading profile...
    </p>
{/await}
