<script lang="ts">
  import { goto } from '$app/navigation';
  import { tasks } from '$lib/stores/taskStores';
  import { selectedCategories } from '$lib/utils/findTasks';
  import { sidebarWidth, pageWidth } from '$lib/stores/uiStore';

  const categories = ['All', 'Work', 'Personal', 'Finance'];

  const selectCategory = (category: string) => {
      selectedCategories.update(list => [])
      if (category !== "All") {
        selectedCategories.update(list => [...list, category])
      }
      goto('/tasks')
  }

  let openSidebar = $state(false)

  const toggleSidebar = () => {
    openSidebar = !openSidebar
    sidebarWidth.update(value => value === 8 ? 22 : 8)
    pageWidth.update(value => 100)
  }
</script>

<nav class="sidebar" 
  style="flex-basis: {$sidebarWidth}%;"
  class:move={openSidebar} aria-label="Main navigation">
  <div class="side-menu-btn-container">
    <button class="side-menu-btn" class:rotateBtn={openSidebar} 
      onclick={() => toggleSidebar()}>💨</button>
  </div>

  <div class="sb-section sb-menu">
    {#if !openSidebar}
      <h4><span>📑</span></h4>
    {:else}
      <h4 class="openedSidebar"><span>📑</span>Menu</h4>
      <ul class="navigation">
        <li><a href="/" class="nav-link">Dashboard</a></li>
        <li><a onclick={() => selectedCategories.update(list => [])} href="/tasks" class="nav-link">All Tasks</a></li>
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
        {#each categories as category}
          <li>
            <button onclick={() => selectCategory(category)} 
              aria-label={`Filter by ${category}`}>{category}</button>
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
