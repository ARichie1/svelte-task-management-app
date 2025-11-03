<script lang="ts">
    import { tasks, taskStore } from '$lib/stores/taskStores';

    const categories = ['All', 'Work', 'Personal', 'Finance'];

    const selectCategory = (cat: string) => {
        // taskStore.setCategory(cat as any);
    }

    let openSidebar = $state(false)
</script>

<nav class="sidebar" aria-label="Main navigation">
  <div class="side-menu-btn-container">
    <button class="side-menu-btn" onclick={() => openSidebar = !openSidebar}>💨</button>
  </div>

  <div class="sb-section sb-menu">
    {#if !openSidebar}
      <h4><span>📑</span></h4>
    {:else}
      <h4 class="openedSidebar"><span>📑</span>Menu</h4>
      <ul class="navigation">
        <li><a href="/" class="nav-link">Dashboard</a></li>
        <li><a href="/tasks" class="nav-link">All Tasks</a></li>
        <li><a href="/settings" class="nav-link">Settings</a></li>
      </ul>
    {/if}
  </div>
  <div class="sb-section categories">
    {#if !openSidebar}
      <h4><span>📂</span></h4>
    {:else}
      <h4 class="openedSidebar"><span>📂</span>Categories</h4>
      <ul>
        {#each categories as c}
          <li>
            <button onclick={() => selectCategory(c)} aria-label={`Filter by ${c}`}>{c}</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <div class="sb-section meta">
    {#if !openSidebar}
      <h4><span>{$tasks.length}</span></h4>
    {:else}
      <h4 class="openedSidebar"><span>{$tasks.length}</span>Tasks Currently</h4>
    {/if}
  </div>
</nav>
