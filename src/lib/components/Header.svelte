<script lang="ts">
  import Menu from './shared/Menu.svelte';

  let isMobile = $state(false)
  let showMobileMenu = $state(false)
</script>

<header class="app-header" aria-label="banner">
  <div class="title">Task Manager</div>

  <Menu menu_class="media-mode desktop-mode"/>

  {#if showMobileMenu}
    <Menu menu_class="media-mode mobile-mode"/>
  {/if}

  <div class="menu-btn-container">
    <button onclick={() => showMobileMenu = !showMobileMenu}>📑</button>
  </div>
</header>

<style>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    background-color: var(--header-bg, #f0f0f0);
  }
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>