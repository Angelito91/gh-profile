<script lang="ts">
  import type { Repo } from '../../types';
  import { getLanguageColor, formatNumber } from '../utils/utils';

  let { repo } = $props<{ repo: Repo }>();
</script>

<div class="group block bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-5 border border-zinc-800/50 hover:border-violet-500/30 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-violet-900/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
  <!-- Main link overlay -->
  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-20" aria-label={repo.name}></a>
  
  <!-- Hover gradient effect -->
  <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

  <div class="flex justify-between items-start mb-3 relative z-10">
    <div class="text-base font-bold text-zinc-200 group-hover:text-violet-300 truncate pr-2 transition-colors">
      {repo.name}
    </div>
    <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-zinc-900/50 text-zinc-500 border border-zinc-800/50 uppercase tracking-wider shrink-0">
      {repo.visibility}
    </span>
  </div>

  <p class="text-zinc-400 text-sm mb-4 line-clamp-2 grow leading-relaxed font-light relative z-10">
    {repo.description || 'No description provided.'}
  </p>

  {#if repo.topics && repo.topics.length > 0}
    <div class="flex flex-wrap gap-1.5 mb-4 relative z-10">
      {#each repo.topics.slice(0, 4) as topic}
        <span class="px-2 py-0.5 text-[10px] rounded-md bg-violet-900/10 text-violet-300 border border-violet-500/10">
          {topic}
        </span>
      {/each}
      {#if repo.topics.length > 4}
        <span class="px-2 py-0.5 text-[10px] rounded-md bg-zinc-800 text-zinc-500 border border-zinc-700">
          +{repo.topics.length - 4}
        </span>
      {/if}
    </div>
  {/if}

  <div class="flex items-center justify-between mt-auto relative z-10 pt-3 border-t border-zinc-800/50">
    <div class="flex items-center gap-4 text-xs text-zinc-500">
      {#if repo.language}
        <div class="flex items-center gap-1.5">
          <span 
            class="w-2.5 h-2.5 rounded-full shadow-sm" 
            style="background-color: {getLanguageColor(repo.language)}; box-shadow: 0 0 6px {getLanguageColor(repo.language)}66"
          ></span>
          {repo.language}
        </div>
      {/if}

      <div class="flex items-center gap-1 group-hover:text-zinc-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        {formatNumber(repo.stargazers_count)}
      </div>

      <div class="flex items-center gap-1 group-hover:text-zinc-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {formatNumber(repo.forks_count)}
      </div>
    </div>

    {#if repo.homepage}
      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors bg-violet-900/10 px-2 py-1 rounded-md border border-violet-500/20 hover:bg-violet-900/30 relative z-30">
        Live Demo
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    {/if}
  </div>
</div>
