<script lang="ts">
  import { derived } from 'svelte/store';
  import { taskStore } from '$lib/stores/taskStores';
  import Slide from './shared/Slide.svelte';
  import Modal from './shared/Modal.svelte';
  import TaskForm from './TaskForm.svelte';

  // Access Props Via $props
  const props = $props<{info: object}>();

  // Hold Locally But Reactive
  const info = $state(props.info ?? {});

  // Reactively Derive Tasks From The Global Store
  const tasks = derived(taskStore, $tasks =>
    $tasks.filter(t => t.priority === props.info.priority)
  );

  let showModal = $state(false)
  let addingTo = $state(false)
  const handleCancel = () => {showModal = false; addingTo = false}
  const openAddToQuadrant = () => {showModal = true; addingTo = true}
</script>

<section class="quadrant" aria-label={info.title}>
  <div class="quadrant-header">
    <h4>{info.title} <small>| {$tasks.length}</small></h4>
    <button class="btn add" 
      onclick={openAddToQuadrant}>
      <span>+</span>
    </button>
  </div>
  
  <div class="list-container">
    <div class="list">
      <Slide {info} gap={16} cardWidth={300}/>
    </div>
  </div>

  <!-- Modal Used To ADD Task To This Specific Quadrant -->
  <Modal open={showModal} onClose={handleCancel}>
    <h3>Add A Task</h3>
    <TaskForm
      onCancel={handleCancel}
      isAddingTo={addingTo}
      quadrantToAddTo={info}
    />
  </Modal>
</section>
