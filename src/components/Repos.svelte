<script lang="ts">
    import { fade } from "svelte/transition";
    import moment from "moment";

    // Consts
    import { URL_USER, PARAMS_USER } from "../utils/const";

    // Stores
    import { user } from "../utils/store";

    // Icons
    import CodeIcon from "./icons/Code.svelte";
    import ForkIcon from "./icons/Fork.svelte";
    import StarIcon from "./icons/Star.svelte";

    // Types
    import type { Repo } from "../types";

    // Get the data of api.github and return the repos
    const getRepos = async ({ user }: { user: String }) => {
        const res = await fetch(URL_USER + user + PARAMS_USER);
        const data: Repo[] = await res.json();
        return data;
    };
</script>

{#await getRepos({ user: $user })}
    <p class="text-center text-xl text-slate-500 my-2">Loading the repos ...</p>
{:then repos}
    <div in:fade out:fade class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        {#each repos as repo}
            <a
                href={repo.html_url}
                class="flex flex-col justify-between gap-3 p-5 transition hover:scale-105 rounded-lg shadow bg-gradient-to-r from-slate-900 to-purple-800/20"
            >
                <p class="text-lg md:text-xl mb-2">{repo.name}</p>
                <p class="text-sm md:text-md text-slate-500">{repo.description}</p>
                <div class="flex items-center gap-5 md:gap-10">
                    <p
                        class="flex justify-center items-center gap-1 text-sm md:text-md text-purple-600"
                    >
                        <CodeIcon />{repo.language}
                    </p>
                    <p
                        class="flex justify-center items-center gap-1 text-sm md:text-md text-emerald-600"
                    >
                        <ForkIcon />{repo.forks}
                    </p>
                    <p
                        class="flex justify-center items-center gap-1 text-sm md:text-md text-yellow-500"
                    >
                        <StarIcon />{repo.stargazers_count}
                    </p>
                    <p
                        class="flex justify-center items-center gap-1 text-xs md:text-sm text-slate-500"
                    >
                        {moment(repo.updated_at).fromNow()}
                    </p>
                </div>
            </a>
        {/each}
    </div>
{:catch}
    <p class="text-center text-lg md:text-xl text-red-300 my-2">error ...</p>
{/await}
