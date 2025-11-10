<script lang="ts">
  import Menu from './shared/Menu.svelte';

  const props = $props<{
    closeMobileMenu?: () => void;
    toggleMobileMenu?: () => void;
  }>();
  
</script>

<header class="app-header" aria-label="banner">
  <div class="title"><a href="/" aria-label="app-title">Task Manager</a></div>

  <Menu menu_class="media-mode desktop-mode" closeMobileMenu={props.closeMobileMenu}/>

  <Menu menu_class="media-mode mobile-mode" closeMobileMenu={props.closeMobileMenu}/>

  <div class="menu-btn-container">
    <button onclick={() => props.toggleMobileMenu?.()}>📑</button>
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