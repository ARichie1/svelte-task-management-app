<script lang="ts">
	import "../app.css"
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	import { slide } from "svelte/transition";

	let { children } = $props();

	let showMobileMenu = $state(false)
	let closeMobileMenu = () => {
		showMobileMenu = false
	}
	let toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu
	}
</script>

<div class="app-container">
  <div class="main-content">
    <Header {showMobileMenu} {closeMobileMenu} {toggleMobileMenu}/>
	<!-- {#if showMobileMenu} -->
		<button class="page-content-overlay"
		class:slide-right={showMobileMenu}
			onclick={closeMobileMenu} 
			aria-label="close mobile menu"
		></button>
	<!-- {/if} -->
	<div class="page-content">
		<Sidebar />
		{@render children?.()}
	</div>
  </div>
</div>

