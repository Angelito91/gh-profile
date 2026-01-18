<script lang="ts">
  import { onMount } from "svelte";

  // Components
  import SearchBar from "./lib/components/SearchBar.svelte";
  import ProfileCard from "./lib/components/ProfileCard.svelte";
  import RepoCard from "./lib/components/RepoCard.svelte";
  import LanguageStats from "./lib/components/LanguageStats.svelte";
  import OrgList from "./lib/components/OrgList.svelte";
  import ActivityFeed from "./lib/components/ActivityFeed.svelte";
  import UserSuggestions from "./lib/components/UserSuggestions.svelte";
  import ProfileReadme from "./lib/components/ProfileReadme.svelte";

  // Apis
  import { getAllDataFromGithub } from "./lib/api/github";
  import type { Profile, Repo, Organization, Event, Owner } from "./types";

  let profile = $state<Profile | null>(null);
  let repos = $state<Repo[]>([]);
  let orgs = $state<Organization[]>([]);
  let events = $state<Event[]>([]);
  let followers = $state<Owner[]>([]);
  let readme = $state<string | null>(null);
  let loading = $state(false);
  let error = $state<string | null>(null);
  let sortType = $state<"updated" | "stars" | "forks" | "name">("updated");

  let sortedRepos = $derived.by(() => {
    const sorted = [...repos].sort((a, b) => {
      if (sortType === "stars") return b.stargazers_count - a.stargazers_count;
      if (sortType === "forks") return b.forks_count - a.forks_count;
      if (sortType === "name") return a.name.localeCompare(b.name);
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
    return sorted.slice(0, 10);
  });

  $effect(() => {
    if (profile) {
      document.title = `${profile.name || profile.login} | GitHub Explorer`;
    } else {
      document.title = "GitHub Explorer - Cosmic Dashboard";
    }
  });

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    if (user) {
      handleSearch(user, false);
    }

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const user = params.get("user");
      if (user) {
        handleSearch(user, false);
      } else {
        profile = null;
        repos = [];
        orgs = [];
        events = [];
        followers = [];
        readme = null;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  });

  async function handleSearch(username: string, updateUrl = true) {
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("user", username);
      window.history.pushState({}, "", url);
    }

    loading = true;
    error = null;
    profile = null;
    repos = [];
    orgs = [];
    events = [];
    followers = [];
    readme = null;

    try {
      const {
        eventsData,
        followersData,
        orgsData,
        profileData,
        readmeData,
        reposData,
      } = await getAllDataFromGithub(username);
      profile = profileData;
      repos = reposData;
      orgs = orgsData;
      events = eventsData;
      followers = followersData;
      readme = readmeData;
    } catch (e) {
      error = "User not found or API limit exceeded.";
      console.error(e);
    } finally {
      loading = false;
    }
  }
</script>

<main
  class="min-h-screen bg-zinc-950 text-zinc-200 py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden selection:bg-violet-500/30 selection:text-violet-100"
>
  <!-- Background Gradients -->
  <div class="fixed inset-0 pointer-events-none">
    <div
      class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse"
    ></div>
    <div
      class="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-fuchsia-600/10 blur-[100px] animate-pulse delay-1000"
    ></div>
    <div
      class="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse delay-2000"
    ></div>
  </div>

  <div class="max-w-7xl mx-auto relative z-10">
    <div
      class="flex flex-col md:flex-row items-center justify-between mb-12 gap-6"
    >
      <div class="text-center md:text-left">
        <h1
          class="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-violet-200 to-fuchsia-200 drop-shadow-sm"
        >
          GitHub Explorer
        </h1>
        <p class="text-zinc-400 text-sm font-light mt-1">
          Cosmic Dashboard Edition
        </p>
      </div>
      <div class="w-full md:w-auto min-w-[300px]">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>

    {#if loading}
      <div class="flex justify-center items-center py-40">
        <div class="relative w-20 h-20">
          <div
            class="absolute inset-0 border-4 border-zinc-800 rounded-full"
          ></div>
          <div
            class="absolute inset-0 border-4 border-violet-500 rounded-full border-t-transparent animate-spin"
          ></div>
        </div>
      </div>
    {:else if error}
      <div
        class="backdrop-blur-md bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-2xl text-center max-w-md mx-auto shadow-lg shadow-red-900/20"
        role="alert"
      >
        {error}
      </div>
    {:else if profile}
      <div
        class="animate-in fade-in slide-in-from-bottom-8 duration-700 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <!-- Left Sidebar (Profile) -->
        <div class="lg:col-span-4 xl:col-span-3 space-y-6">
          <div class="lg:sticky lg:top-8 space-y-6">
            <ProfileCard {profile} />
            <div class="hidden lg:block space-y-6">
              <LanguageStats {repos} />
              <OrgList {orgs} />
              <UserSuggestions users={followers} title="Network" />
              <ActivityFeed {events} />
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-8 xl:col-span-9 space-y-8">
          <!-- Mobile only stats (visible on small screens) -->
          <div class="lg:hidden space-y-6">
            <LanguageStats {repos} />
            <OrgList {orgs} />
          </div>

          {#if readme}
            <ProfileReadme markdown={readme} />
          {/if}

          <div class="space-y-8">
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2"
            >
              <div class="flex items-center gap-3">
                <h3
                  class="text-2xl font-bold text-white flex items-center gap-3"
                >
                  <span
                    class="w-1.5 h-8 bg-linear-to-b from-violet-400 to-fuchsia-600 rounded-full"
                  ></span>
                  Repositories
                </h3>
                <span
                  class="px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-xs font-medium backdrop-blur-sm"
                >
                  {repos.length} Public
                </span>
              </div>

              <div
                class="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/50 backdrop-blur-sm overflow-x-auto max-w-full"
              >
                <button
                  class="px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap {sortType ===
                  'updated'
                    ? 'bg-violet-500/20 text-violet-300 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}"
                  onclick={() => (sortType = "updated")}
                >
                  Date
                </button>
                <button
                  class="px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap {sortType ===
                  'stars'
                    ? 'bg-violet-500/20 text-violet-300 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}"
                  onclick={() => (sortType = "stars")}
                >
                  Stars
                </button>
                <button
                  class="px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap {sortType ===
                  'forks'
                    ? 'bg-violet-500/20 text-violet-300 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}"
                  onclick={() => (sortType = "forks")}
                >
                  Forks
                </button>
                <button
                  class="px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap {sortType ===
                  'name'
                    ? 'bg-violet-500/20 text-violet-300 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}"
                  onclick={() => (sortType = "name")}
                >
                  Name
                </button>
              </div>
            </div>

            {#if repos.length === 0}
              <div
                class="backdrop-blur-md bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-12 text-center"
              >
                <p class="text-zinc-400 text-lg">
                  This user has no public repositories yet.
                </p>
              </div>
            {:else}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each sortedRepos as repo (repo.id)}
                  <RepoCard {repo} />
                {/each}
              </div>
            {/if}

            <div class="lg:hidden space-y-6">
              <UserSuggestions users={followers} title="Network" />
              <ActivityFeed {events} />
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="text-center py-32">
        <div
          class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 mb-6 shadow-2xl shadow-violet-900/20 group hover:scale-110 transition-transform duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-zinc-500 group-hover:text-violet-400 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-zinc-200 mb-3">Ready to Explore</h3>
        <p class="text-zinc-500 max-w-sm mx-auto">
          Enter a GitHub username to launch the dashboard.
        </p>
      </div>
    {/if}

    <footer class="mt-20 text-center text-zinc-600 text-xs pb-8">
      <p>
        Built with <span class="text-violet-400">Svelte 5</span> &
        <span class="text-cyan-400">Tailwind CSS</span>
      </p>
    </footer>
  </div>
</main>

<style>
  :global(body) {
    background-color: #09090b; /* zinc-950 */
  }
</style>
