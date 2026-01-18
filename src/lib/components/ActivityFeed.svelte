<script lang="ts">
  import type { Event } from "../../types";

  let { events } = $props<{ events: Event[] }>();

  function getEventAction(event: Event): string {
    switch (event.type) {
      case "PushEvent":
        return `pushed to ${event.repo.name.split("/")[1]}`;
      case "PullRequestEvent":
        return `${event.payload.action} PR in ${event.repo.name}`;
      case "IssuesEvent":
        return `${event.payload.action} issue in ${event.repo.name}`;
      case "WatchEvent":
        return `starred ${event.repo.name}`;
      case "ForkEvent":
        return `forked ${event.repo.name}`;
      case "CreateEvent":
        return `created ${event.payload.ref_type} in ${event.repo.name}`;
      default:
        return `interacted with ${event.repo.name}`;
    }
  }

  function getEventIcon(type: string): string {
    switch (type) {
      case "PushEvent":
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />';
      case "PullRequestEvent":
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />';
      case "WatchEvent":
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />';
      default:
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />';
    }
  }
</script>

{#if events.length > 0}
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Recent Activity
    </h3>

    <div class="space-y-4">
      {#each events as event}
        <div class="flex items-start gap-3 text-sm group">
          <div
            class="mt-1 p-1.5 rounded-full bg-zinc-800 text-violet-400 border border-zinc-700 group-hover:border-violet-500/50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {@html getEventIcon(event.type)}
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-zinc-300 truncate">
              <span class="font-medium text-white">{getEventAction(event)}</span
              >
            </p>
            <p class="text-zinc-500 text-xs">
              {new Date(event.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
