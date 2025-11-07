<script lang="ts">
  import { derived } from 'svelte/store';
  import { tasks, taskStore } from '$lib/stores/taskStores';
  import { filterPanelState } from '$lib/stores/uiStore';
  import { findTasks, searchQuery, filterCompletion,
    filterHigh, filterMedium, filterLow, filterVeryLow, 
    sortOption, selectedCategories
  } from '$lib/utils/findTasks';
  import TaskCard from '$lib/components/TaskCard.svelte';
  import Modal from '$lib/components/shared/Modal.svelte';
  import ConfirmDelete from '$lib/components/shared/ConfirmDelete.svelte';

  // Derive All Unique Categories From Tasks
  const categories = derived(tasks, $tasks => 
    Array.from(new Set($tasks.map(t => t.category).filter(Boolean)))
  );

  // Derived FilteredTasks Store
  const filteredTasks = derived(
    [tasks, searchQuery, filterCompletion, filterHigh, filterMedium, filterLow, filterVeryLow, selectedCategories, sortOption],
    ([$tasks, $searchQuery, $filterCompletion, $filterHigh, $filterMedium, $filterLow, $filterVeryLow, $selectedCategories, $sortOption]) =>
      findTasks($tasks, {
        searchQuery: $searchQuery,
        filterCompletion: $filterCompletion,
        filterHigh: $filterHigh,
        filterMedium: $filterMedium,
        filterLow: $filterLow,
        filterVeryLow: $filterVeryLow,
        selectedCategories: $selectedCategories,
        sortOption: $sortOption
      })
  );

  let toggleFilterPanel = () => {
		filterPanelState.update(value => !value);
	}

  let deleting = $state(false)
  let showModal = $state(false)
  
  // Closes and Resets Modal
  let handleCancel = () => {
    showModal = false
    deleting = false 
  }

  const openDelete = () => { 
    deleting = true;  
    showModal = true;
    filterPanelState.update(value => false) 
  }

  const deleteAllTasks = () => { 
    taskStore.resetTasks()
    console.log("deleted all current tasks");
    handleCancel()
  }
</script>

<div class="tasks-page-body-container">
  <div class="find">
    <div class="searchbar">
      <input type="search" placeholder="Search for a task" bind:value={$searchQuery} />
    </div>

    <div class="find-by-buttons">
        <button class="btn" 
          onclick={() => toggleFilterPanel()}>
          Filter or Sort 
        </button>
    </div>

    <div class="deleteAllTasks">
      <button class="btn delete" onclick={() => {openDelete()}} aria-label="Delete All Tasks">🗑</button>
    </div>

    {#if $filterPanelState}
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

        <div class="categories find-by-section">
          <h4>Categories</h4>
          <div class="inputs">
            {#each $categories as category}
              <label>
                <input
                  type="checkbox"
                  checked={$selectedCategories.includes(category)}
                  onchange={(e) => {
                    if (e.currentTarget.checked)
                      selectedCategories.update(list => [...list, category]);
                    else
                      selectedCategories.update(list => list.filter(c => c !== category));
                  }}
                />
                {category}
              </label>
            {/each}
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

<Modal open={showModal} onClose={handleCancel}>
  {#if deleting}
    <ConfirmDelete onCancel={handleCancel} onDelete={deleteAllTasks}/>
  {/if}
</Modal>