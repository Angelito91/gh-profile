<script lang="ts">
    import { fade } from "svelte/transition";
    import moment from "moment";

    // Consts
    import { URL, PARAMS } from "../utils/const";

    // Stores
    import { user } from "../utils/store";

    // utils
    import { convertNumber } from "../utils/convertNumber";

    // Icons
    import CodeIcon from "./icons/Code.svelte";
    import ForkIcon from "./icons/Fork.svelte";
    import StarIcon from "./icons/Star.svelte";
    import GithubIcon from "./icons/Github.svelte";

    // Types
    import type { Repo } from "../types";

    // Get the data of api.github and return the repos
    const getRepos = async ({ user }: { user: String }) => {
        const res = await fetch(URL + user + PARAMS);
        const data: Repo[] = await res.json();
        return data;
    };
</script>

{#await getRepos({ user: $user })}
    <p class="text-slate-500 my-2 text-xl text-center">Loading the repos ...</p>
{:then repos}
    <div transition:fade class="lg:grid-cols-2 grid grid-cols-1 gap-10 mt-10">
        {#each repos as repo}
            <div
                class=" hover:shadow hover:shadow-slate-600/40 border-slate-600/40 z-10 flex flex-col justify-between gap-3 p-5 transition border rounded-lg"
            >
                <p
                    class="md:text-xl flex items-center justify-between mb-2 text-lg"
                >
                    {repo.name}
                    <a
                        class="hover:opacity-100 transition opacity-50"
                        href={repo.html_url}
                        target="_blank"><GithubIcon /></a
                    >
                </p>
                <p class="md:text-md text-slate-400 text-sm">
                    {repo.description || "no description"}
                </p>
                <div class="md:gap-10 flex items-center gap-5">
                    <p
                        class="md:text-md flex items-center justify-center gap-1 text-sm text-blue-500"
                    >
                        <CodeIcon />{repo.language || "none"}
                    </p>
                    <p
                        class="md:text-md text-emerald-600 flex items-center justify-center gap-1 text-sm"
                    >
                        <ForkIcon />{convertNumber(repo.forks)}
                    </p>
                    <p
                        class="md:text-md flex items-center justify-center gap-1 text-sm text-yellow-500"
                    >
                        <StarIcon />{convertNumber(repo.stargazers_count)}
                    </p>
                    <p
                        class="md:text-sm text-slate-400/80 flex items-center justify-center gap-1 text-xs"
                    >
                        {moment(repo.updated_at).fromNow()}
                    </p>
                </div>
            </div>
        {/each}
    </div>
{:catch}
    <p class="md:text-xl my-2 text-lg text-center text-red-300">
        error loading repos ...
    </p>
{/await}
