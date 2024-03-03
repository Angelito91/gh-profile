<script lang="ts">
  import Profile from "./components/Profile.svelte";
  import Repos from "./components/Repos.svelte";
  import Search from "./components/Search.svelte";
</script>

<main class="min-h-screen md:w-4/5 md:mx-auto text-white p-10">
  <Search />
  <Profile />
  <Repos />
</main>
