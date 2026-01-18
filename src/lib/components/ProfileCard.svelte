<script lang="ts">
  import type { Profile } from '../../types';
  import { formatNumber } from '../utils/utils';

  let { profile } = $props<{ profile: Profile }>();
</script>

<div class="backdrop-blur-xl bg-zinc-900/40 border border-zinc-700/50 rounded-3xl p-6 shadow-2xl shadow-black/20 relative overflow-hidden group">
  <!-- Decorative gradient blob -->
  <div class="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-700"></div>
  
  <div class="flex flex-col gap-6 items-center text-center relative z-10">
    <div class="shrink-0 relative">
      <div class="absolute inset-0 bg-linear-to-br from-violet-400 to-fuchsia-600 rounded-full blur-md opacity-50"></div>
      <img
        src={profile.avatar_url}
        alt={profile.name || profile.login}
        class="w-40 h-40 rounded-full border-2 border-zinc-700/50 shadow-xl relative z-10"
      />
      {#if profile.hireable}
        <div class="absolute -bottom-2 -right-2 z-20 bg-linear-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-green-400/50 animate-bounce-slow">
          HIREABLE
        </div>
      {/if}
    </div>
    
    <div class="w-full">
      <div class="mb-6">
        <h2 class="text-3xl font-black text-white tracking-tight mb-1">{profile.name || profile.login}</h2>
        <a 
          href={profile.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-violet-400 hover:text-violet-300 transition-colors text-lg font-medium flex items-center justify-center gap-1"
        >
          @{profile.login}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <div class="mt-3 inline-block text-zinc-400 text-xs font-medium px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm">
          Joined {new Date(profile.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
        </div>
      </div>

      {#if profile.bio}
        <p class="text-zinc-300 mb-6 text-base leading-relaxed font-light">{profile.bio}</p>
      {/if}

      <div class="grid grid-cols-3 gap-2 mb-6">
        <div class="text-center p-2 rounded-xl bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors">
          <div class="text-xl font-bold text-white">{formatNumber(profile.public_repos)}</div>
          <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Repos</div>
        </div>
        <div class="text-center p-2 rounded-xl bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors">
          <div class="text-xl font-bold text-white">{formatNumber(profile.followers)}</div>
          <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Followers</div>
        </div>
        <div class="text-center p-2 rounded-xl bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors">
          <div class="text-xl font-bold text-white">{formatNumber(profile.following)}</div>
          <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Following</div>
        </div>
      </div>

      <div class="flex flex-col gap-3 text-sm text-zinc-400 items-center md:items-start w-full px-4">
        {#if profile.company}
          <div class="flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span class="font-medium text-zinc-300 truncate">{profile.company}</span>
          </div>
        {/if}

        {#if profile.location}
          <div class="flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="truncate">{profile.location}</span>
          </div>
        {/if}

        {#if profile.email}
          <div class="flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${profile.email}`} class="hover:text-violet-400 transition-colors truncate">
              {profile.email}
            </a>
          </div>
        {/if}
        
        {#if profile.blog}
          <div class="flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" class="hover:text-violet-400 transition-colors truncate">
              {profile.blog}
            </a>
          </div>
        {/if}

        {#if profile.twitter_username}
          <div class="flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noopener noreferrer" class="hover:text-violet-400 transition-colors truncate">
              @{profile.twitter_username}
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
