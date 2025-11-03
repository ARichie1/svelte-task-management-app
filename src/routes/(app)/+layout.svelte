<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
//   export let data;
  let { data } = $props()
</script>

<div class="app-shell">
  <Sidebar />
  <div class="main">
    <Header />
    <slot />
  </div>
</div>

<style>
  .app-shell { display:flex; min-height:100vh; }
  .main { flex:1; padding: 1rem; }
</style>
