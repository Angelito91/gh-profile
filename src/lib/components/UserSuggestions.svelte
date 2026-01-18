<script lang="ts">
  import type { Owner } from "../../types";

  let { users, title = "Suggested Users" } = $props<{
    users: Owner[];
    title?: string;
  }>();
</script>

{#if users.length > 0}
  <div
    class="backdrop-blur-xl bg-zinc-900/40 border border-zinc-700/50 rounded-3xl p-6 shadow-xl shadow-black/20 relative overflow-hidden"
  >
    <div class="flex items-center gap-3 mb-6 relative z-10">
      <div
        class="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400"
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-zinc-200">{title}</h3>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
      {#each users as user}
        <a
          href="?user={user.login}"
          class="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:bg-zinc-800/50 hover:border-purple-500/30 transition-all group"
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            class="w-10 h-10 rounded-full border border-zinc-600 group-hover:border-purple-400 transition-colors"
          />
          <div class="overflow-hidden">
            <div
              class="font-medium text-zinc-200 truncate group-hover:text-purple-300 transition-colors"
            >
              {user.login}
            </div>
            <div class="text-xs text-zinc-500 truncate">View Profile</div>
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}
