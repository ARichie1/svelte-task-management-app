<script lang="ts">
  import { taskStore } from '$lib/stores/taskStores';
  import { type Task, checkPriority} from "$lib/stores/types"

  import { v4 as uuid } from 'uuid';

 const props = $props<{
    onCancel?: () => void;
    isEditing?: boolean;
    isAddingTo?: boolean;
    taskToEdit?: string;
    quadrantToAddTo?: {
      title: string;
      key: string;
      priority: string;
      id: number;
    };
    initial?: Partial<Task>;
  }>();

  // Default values
  let title = $state(props.initial?.title ?? "");
  let description = $state(props.initial?.description ?? "");
  let priority = $state(props.initial?.priority ?? props.quadrantToAddTo?.priority ?? "High");
  let category = $state(props.initial?.category ?? "");
  let dueDate = $state(props.initial?.dueDate ?? "");
  let isUrgent = $state(props.initial?.isUrgent ?? false);
  let isImportant = $state(props.initial?.isImportant ?? false);
  let quadrant = $state(props.initial?.quadrant ?? "");
  let quadrant_title = $state(props.initial?.quadrant_title ?? "");

  let isAddingTo = $state(props.isAddingTo)
  let isEditing = $state(props.isEditing)

  // Config The Task's Quadrant Based On Priority
  $effect(() => {
    let initQuadrantConfig = checkPriority(priority)
    isUrgent = initQuadrantConfig.isUrgent
    isImportant = initQuadrantConfig.isImportant
    quadrant = initQuadrantConfig.quadrant
    quadrant_title = initQuadrantConfig.quadrant_title
  })

  // Add A New Task To The taskStore 
  // Based On The User Specified Priority
  const addTask = (e: Event) => {
    e.preventDefault()

    const newTask: Task = {
      id: uuid(),
      title,
      description,
      priority: props.isAddingTo ? props.quadrantToAddTo?.priority : "High",
      category,
      dueDate,
      isUrgent,
      isImportant,
      isComplete: false,
      quadrant: props.isAddingTo ? props.quadrantToAddTo?.key ?? quadrant : quadrant,
      quadrant_title: props.isAddingTo ? props.quadrantToAddTo?.title ?? quadrant_title : quadrant_title,
    };

    if (props.isEditing && props.taskToEdit) {
      taskStore.editTask(props.taskToEdit, newTask);
    } else {
      taskStore.addTask(newTask);
    }

    props.onCancel?.();

    // Reset form
    title = "";
    description = "";
    category = "";
    dueDate = "";
    priority = "High";
  }

  const errorExist = () => {
    return false
  }
</script>

<form onsubmit={(e) => addTask(e)}>
  <div class="form-row">
    <label for="title">Title</label>
    <div class="input-container">
      <input type="text" placeholder="Title" bind:value={title} id="title" required/>
    </div>
  </div>

  <div class="form-row">
    <label for="description">Description</label>
    <div class="input-container">
      <textarea placeholder="Description" bind:value={description} id="description"></textarea>
    </div>
  </div>

  <div class="form-row">
    <label for="due_date">Due Date</label>
    <div class="input-container">
      <input type="date" bind:value={dueDate} id="due_date"/>
    </div>
  </div>

  {#if !isAddingTo}
    <div class="form-row">
      <label for="priority">Priority</label>
      <div class="input-container">
        <select bind:value={priority} id="priority">
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
          <option>Very Low</option>
        </select>
      </div>
    </div>
  {/if}

  <div class="form-row">
    <label for="category">Category</label>
    <div class="input-container">
      <select bind:value={category} id="category">
        <option>Work</option>
        <option>Personal</option>
        <option>Finance</option>
      </select>
    </div>
  </div>

  <div class="form-buttons-container">
    <button type="button" class="btn ghost small" onclick={() => props.onCancel?.()}>Cancel</button>
    <button type="submit" class={`btn small ${errorExist() ? "disabled" :  "enabled"}`}>
      {isEditing ? "Update Task" : "Add Task"}
    </button>
  </div>
</form>
