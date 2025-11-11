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
      <h4 class="openedSidebar">
        <span>📑</span>{#if openSidebar}Menu{/if}
      </h4>
      {#if openSidebar}
      <ul class="navigation">
        <li><a href="/" class="nav-link">Dashboard</a></li>
        <li><a onclick={() => selectedCategories.update(list => [])} href="/tasks" class="nav-link">All Tasks</a></li>
        <li><a href="/settings" class="nav-link">Settings</a></li>
      </ul>
    {/if}
  </div>
  <div class="sb-section categories">
    <h4 class="openedSidebar">
      <span>📂</span>{#if openSidebar}Categories{/if}
    </h4>
    {#if openSidebar}
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
      <h4 class="openedSidebar">
        <span>{$tasks.length}</span>
        {#if openSidebar}Tasks Currently{/if}
      </h4>
  </div>
</nav>
