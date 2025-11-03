<script lang="ts">
  import { tasks } from '$lib/stores/taskStores';
  import TaskCard from '$lib/components/TaskCard.svelte';
  import { writable, derived } from 'svelte/store';
  import { findTasks, type TaskFilters } from '$lib/utils/findTasks';

  // Make Each User Input Its Own Store
  const searchQuery = writable('');
  const filterCompletion = writable(false);
  const filterHigh = writable(false);
  const filterMedium = writable(false);
  const filterLow = writable(false);
  const filterVeryLow = writable(false);
  const sortOption = writable('Time');

  // Derived FilteredTasks Store
  const filteredTasks = derived(
    [tasks, searchQuery, filterCompletion, filterHigh, filterMedium, filterLow, filterVeryLow, sortOption],
    ([$tasks, $searchQuery, $filterCompletion, $filterHigh, $filterMedium, $filterLow, $filterVeryLow, $sortOption]) =>
      findTasks($tasks, {
        searchQuery: $searchQuery,
        filterCompletion: $filterCompletion,
        filterHigh: $filterHigh,
        filterMedium: $filterMedium,
        filterLow: $filterLow,
        filterVeryLow: $filterVeryLow,
        sortOption: $sortOption
      })
  );

  let showFindBy = $state(false)
</script>

<div class="tasks-page-body-container">
  <div class="find">
    <div class="searchbar">
      <input type="search" placeholder="Search for a task" bind:value={$searchQuery} />
    </div>

    <div class="find-by-buttons">
        <button class="btn" 
          onclick={() => showFindBy = !showFindBy}>
          Filter or Sort 
        </button>
    </div>

    {#if showFindBy}
      <div class="find-by">
        <div class="filter find-by-section">
          <h4>Filter By</h4>
          <div class="inputs">
            <label><input type="checkbox" bind:checked={$filterCompletion}> Completed</label>
            <label><input type="checkbox" bind:checked={$filterHigh}> High</label>
            <label><input type="checkbox" bind:checked={$filterMedium}> Medium</label>
            <label><input type="checkbox" bind:checked={$filterLow}> Low</label>
            <label><input type="checkbox" bind:checked={$filterVeryLow}> Very Low</label>
          </div>
        </div>

        <div class="sort find-by-section">
          <h4>Sort By</h4>
          <div class="inputs">
            <select bind:value={$sortOption}>
              <option>Time</option>
              <option>Name A-Z</option>
              <option>Name Z-A</option>
              <option>Priority High-VeryLow</option>
              <option>Priority VeryLow-High</option>
            </select>
          </div>
        </div>
      </div>
    {/if}
  </div>

  {#if $filteredTasks.length === 0}
    <p>No tasks available.</p>
  {:else}
    <div class="tasks-list scrollable">
      {#each $filteredTasks as task (task.id)}
        <TaskCard {task} />
      {/each}
    </div>
  {/if}
</div>
