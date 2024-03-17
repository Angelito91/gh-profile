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
    <p class="text-slate-500 my-2 text-xl text-center">Loading the repos ...</p>
{:then repos}
    <div in:fade out:fade class="lg:grid-cols-2 grid grid-cols-1 gap-10 mt-10">
        {#each repos as repo}
            <a
                href={repo.html_url}
                target="_blank"
                class="hover:scale-105 bg-gradient-to-r from-slate-900 to-purple-800/20 z-10 flex flex-col justify-between gap-3 p-5 transition rounded-lg shadow"
            >
                <p class="md:text-xl mb-2 text-lg">{repo.name}</p>
                <p class="md:text-md text-slate-500 text-sm">
                    {repo.description}
                </p>
                <div class="md:gap-10 flex items-center gap-5">
                    <p
                        class="md:text-md flex items-center justify-center gap-1 text-sm text-purple-600"
                    >
                        <CodeIcon />{repo.language}
                    </p>
                    <p
                        class="md:text-md text-emerald-600 flex items-center justify-center gap-1 text-sm"
                    >
                        <ForkIcon />{repo.forks}
                    </p>
                    <p
                        class="md:text-md flex items-center justify-center gap-1 text-sm text-yellow-500"
                    >
                        <StarIcon />{repo.stargazers_count}
                    </p>
                    <p
                        class="md:text-sm text-slate-500 flex items-center justify-center gap-1 text-xs"
                    >
                        {moment(repo.updated_at).fromNow()}
                    </p>
                </div>
            </a>
        {/each}
    </div>
{:catch}
    <p class="md:text-xl my-2 text-lg text-center text-red-300">error loading repos ...</p>
{/await}
