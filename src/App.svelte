<script lang="ts">
  import Profile from "./components/Profile.svelte";
  import Repos from "./components/Repos.svelte";
  import Search from "./components/Search.svelte";
</script>

<main class="md:w-4/5 md:mx-auto md:py-7 min-h-screen p-3 text-white">
  <Search />
  <Profile />
  <Repos />
</main>
