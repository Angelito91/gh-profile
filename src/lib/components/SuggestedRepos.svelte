<script lang="ts">
  import type { Repo } from "../../types";
  import { formatNumber } from "../utils/utils";

  let { repos, language } = $props<{ repos: Repo[]; language: string }>();
</script>

{#if repos.length > 0}
  <div
    class="backdrop-blur-xl bg-zinc-900/40 border border-zinc-700/50 rounded-3xl p-6 shadow-xl shadow-black/20 relative overflow-hidden"
  >
    <div class="flex items-center gap-3 mb-6 relative z-10">
      <div
        class="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
      <div>
        <h3 class="text-xl font-bold text-zinc-200">Trending in {language}</h3>
        <p class="text-xs text-zinc-500">Popular repositories you might like</p>
      </div>
    </div>

    <div class="space-y-4 relative z-10">
      {#each repos as repo}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          class="block p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:bg-zinc-800/50 hover:border-amber-500/30 transition-all group"
        >
          <div class="flex justify-between items-start mb-2">
            <h4
              class="font-bold text-zinc-200 group-hover:text-amber-300 transition-colors truncate pr-2"
            >
              {repo.full_name}
            </h4>
            <div class="flex items-center gap-1 text-xs text-zinc-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-amber-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
              {formatNumber(repo.stargazers_count)}
            </div>
          </div>
          <p
            class="text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed"
          >
            {repo.description || "No description provided."}
          </p>
        </a>
      {/each}
    </div>
  </div>
{/if}
