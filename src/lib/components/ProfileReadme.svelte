<script lang="ts">
  import { marked } from 'marked';

  let { markdown } = $props<{ markdown: string }>();

  let htmlContent = $derived(marked.parse(markdown));
</script>

<div class="backdrop-blur-xl bg-zinc-900/40 border border-zinc-700/50 rounded-3xl p-8 shadow-xl shadow-black/20 relative overflow-hidden">
  <div class="flex items-center gap-3 mb-6 relative z-10">
    <div class="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 class="text-xl font-bold text-zinc-200">Profile README</h3>
  </div>

  <div class="prose prose-invert prose-zinc max-w-none relative z-10 prose-headings:text-zinc-200 prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-zinc-800/50 prose-pre:border prose-pre:border-zinc-700/50">
    {@html htmlContent}
  </div>
</div>
