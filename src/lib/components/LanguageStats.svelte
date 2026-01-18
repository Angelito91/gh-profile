<script lang="ts">
  import type { Repo } from "../../types";
  import { getLanguageColor } from "../utils/utils";

  let { repos } = $props<{ repos: Repo[] }>();

  let languageStats = $derived.by(() => {
    const stats: Record<string, number> = {};
    let total = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        stats[repo.language] = (stats[repo.language] || 0) + 1;
        total++;
      }
    });

    return Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
        color: getLanguageColor(name),
      }));
  });
</script>

{#if languageStats.length > 0}
  <div
    class="backdrop-blur-xl bg-zinc-900/40 border border-zinc-700/50 rounded-3xl p-6 shadow-lg mb-8"
  >
    <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-violet-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
        />
      </svg>
      Top Languages
    </h3>

    <div class="flex h-3 rounded-full overflow-hidden bg-zinc-800 mb-4">
      {#each languageStats as lang}
        <div
          class="h-full transition-all duration-500"
          style="width: {lang.percentage}%; background-color: {lang.color}"
          title="{lang.name}: {lang.percentage}%"
        ></div>
      {/each}
    </div>

    <div class="flex flex-wrap gap-4">
      {#each languageStats as lang}
        <div class="flex items-center gap-2 text-sm">
          <span
            class="w-3 h-3 rounded-full"
            style="background-color: {lang.color}"
          ></span>
          <span class="text-zinc-300 font-medium">{lang.name}</span>
          <span class="text-zinc-500">{lang.percentage}%</span>
        </div>
      {/each}
    </div>
  </div>
{/if}
