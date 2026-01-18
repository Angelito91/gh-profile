<script lang="ts">
  import type { Organization } from "../../types";

  let { orgs } = $props<{ orgs: Organization[] }>();
</script>

{#if orgs.length > 0}
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
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
      Organizations
    </h3>

    <div class="flex flex-wrap gap-4">
      {#each orgs as org}
        <a
          href={`https://github.com/${org.login}`}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative block w-16 h-16 rounded-xl bg-zinc-800 p-2 border border-zinc-700 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-900/20"
          title={org.login}
        >
          <img
            src={org.avatar_url}
            alt={org.login}
            class="w-full h-full object-contain rounded-lg filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </a>
      {/each}
    </div>
  </div>
{/if}
