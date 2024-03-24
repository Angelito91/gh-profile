<script lang="ts">
    // Stores
    import { user } from "../utils/store";

    // Icons
    import SearchIcon from "./icons/Search.svelte";

    // States
    let search: string = "";

    const handleSubmit = (name: string) => {
        if (search.trim().length <= 0) return;

        user.set(name);
        search = "";
    };
</script>

<form
    on:submit|preventDefault={() => handleSubmit(search)}
    class="hover:border-slate-300/40 bg-midnight/40 border-slate-400/40 md:w-1/2 relative flex items-center gap-3 p-2 mx-auto mb-5 transition border rounded-lg"
>
    <input
        class="w-full bg-transparent outline-none"
        type="text"
        placeholder="Your profile name .."
        bind:value={search}
    />

    <button>
        <SearchIcon />
    </button>
</form>
