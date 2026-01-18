<script lang="ts">
  let { onSearch } = $props<{ onSearch: (username: string) => void }>();
  let username = $state('');

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  }
</script>

<form onsubmit={handleSubmit} class="w-full max-w-xl mx-auto relative z-20">
  <div class="relative group">
    <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-zinc-400 group-focus-within:text-violet-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      bind:value={username}
      placeholder="Search GitHub username..."
      aria-label="Search GitHub username"
      class="w-full pl-12 pr-14 py-4 rounded-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 shadow-lg shadow-black/20"
    />
    <div class="absolute inset-y-0 right-0 pr-2 flex items-center">
      <button
        type="submit"
        class="p-2 text-zinc-400 hover:text-white hover:bg-violet-500/20 rounded-full transition-all duration-300"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
</form>
