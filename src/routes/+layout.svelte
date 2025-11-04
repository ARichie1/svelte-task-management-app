<script lang="ts">
	import "../app.css"
	import { mobileMenuState } from "$lib/stores/uiStore";
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	let closeMobileMenu = () => {
		mobileMenuState.update(value => false);
	}
	let toggleMobileMenu = () => {
		mobileMenuState.update(value => !value);
	}
</script>

<div class="app-container">
  <div class="main-content">
    <Header {closeMobileMenu} {toggleMobileMenu}/>
		<button class="page-content-overlay"
		class:slide-right={$mobileMenuState}
			onclick={closeMobileMenu} 
			aria-label="close mobile menu"
		></button>
		<div class="page-content">
			<Sidebar />
			{@render children?.()}
		</div>
  </div>
</div>

