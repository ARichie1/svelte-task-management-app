<script lang="ts">
    import { derived } from 'svelte/store';
    import { taskStore } from '$lib/stores/taskStores';
    import TaskCard from "../TaskCard.svelte";

    // Access Props Via $props
    const props = $props<{
        info: object;
        cardWidth: number;
        gap: number;
    }>();

    // Control The ScrollTo Points
    let cardWidth = props.cardWidth || 300;
    let gap = props.gap || 16;

    // Scroll Wrapper
    let container: HTMLDivElement;

    const scrollByAmount = (dir: number) => {
        container.scrollBy({
            left: dir * (cardWidth + gap),
            behavior: "smooth",
        });
    };

    // Reactively derive tasks from the global store
    const tasks = derived(taskStore, $tasks =>
      $tasks.filter(t => t.priority === props.info.priority)
    );

    // Toogle Nav Buttons Dependent On Available
    let isTask = $state(true)
    const toggleIsTask = (taskExist:boolean) => {
      if (taskExist) isTask = true
      else isTask = false
    }
</script>

<div class="slider-wrapper">
  {#if isTask}
    <button class="nav-btn left"
    style="display: {isTask};" 
      onclick={() => scrollByAmount(-1)} aria-label="Scroll left">‹</button>
  {/if}

  <div class="slider"
    bind:this={container}
    role="group"
    aria-label="Task slider"
  >
    {#each $tasks as task (task.id)}
      <TaskCard taskId={task.id} />
    {:else}
      <div class="empty-tasks">
        <p>No Task Here Yet.</p>
      </div>
    {/each}
  </div>

  {#if isTask}
    <button class="nav-btn right" 
      style="display: {isTask};"
      onclick={() => scrollByAmount(1)} aria-label="Scroll right">›</button>
  {/if}
</div>
