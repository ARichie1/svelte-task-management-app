<script lang="ts">
	import "../app.css"
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();

	let showSidebar = $state(false)
</script>

<div class="app-container">
  <div class="main-content">
    <Header />
	<div class="page-content">
		<Sidebar />
		{@render children?.()}
	</div>
  </div>
</div>

