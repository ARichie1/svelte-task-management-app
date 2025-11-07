<script lang="ts">
  import { onMount } from 'svelte';
  import { formatDistanceToNow, parseISO, differenceInHours } from 'date-fns';
  import { tasks, taskStore } from '$lib/stores/taskStores';
  import type { Task } from '$lib/stores/types';
  import { fly, fade } from 'svelte/transition';
  import { filterPanelState } from '$lib/stores/uiStore';

  import Modal from './shared/Modal.svelte';
  import MoveTask from './shared/MoveTask.svelte';
  import ConfirmDelete from './shared/ConfirmDelete.svelte';
  import TaskForm from './TaskForm.svelte';
  
  // Access props via $props
  const props = $props<{task: Task;}>();

  const task = props.task;

  let showModal = $state(false)

  let moving = $state(false)
  let deleting = $state(false)
  let editing = $state(false)
  let taskToEdit = $state("")

  // Closes and Resets Modal
  let handleCancel = () => {
    showModal = false
    moving = editing = deleting = false 
  }

  // Opens Modal For MOVE, EDIT and DELETE
  const openMove = () => {
    moving = true; 
    showModal = true;
    filterPanelState.update(value => false)
  }
  const openEdit = (id: string) => { 
    console.log(id);
    editing = true; 
    taskToEdit = id;
    showModal = true;
    filterPanelState.update(value => false)
  }
  const openDelete = (task: Task) => { 
    deleting = true;  
    showModal = true;
    filterPanelState.update(value => false) 
  }

  // Callbacks, Fast Implementations Directly In The Tasks Store
  const toggle = (id: string) => {
    taskStore.toggleCompletionOptimistic(id);
    console.log("Completed Task");
  }

  const moveTask = (id:string, newPriority:string) => {
    console.log("moving");
    taskStore.setTaskQuadrant(id, newPriority)
    handleCancel()
  }

  const deleteTask = (id: string) => {
    taskStore.deleteTask(id); 
    console.log("deleted task");
    handleCancel()
  }

  // Use Reactive Variable a User On EDIT or A Template To Add A User
  let initial = $derived(() => {
    return editing ? $tasks.find(task => task.id === taskToEdit) 
    : {
      title: "", description: "",
      priority: "High", category: "",
      dueDate: "", isUrgent: false,
      isImportant: false, quadrant: "",
      quadrant_title: ""
    };
  }); 

  // Use Reactive Variable To Keep Track Of The Time and Status
  let dueStatus = $state<"normal" | "dueSoon" | "overdue">("normal");
  let timeRemaining = $state("");

  // You can make this reactive via settings later
  const URGENT_HOURS = 48;

  // Calculation The Task Urgency Based Priority and Due Date
  const updateDueStatus = () => {
    if (!task.dueDate) return;

    const due = parseISO(task.dueDate);
    const hoursLeft = differenceInHours(due, new Date());
    timeRemaining = formatDistanceToNow(due, { addSuffix: true });

    if (hoursLeft <= 0) dueStatus = "overdue";
    else if (hoursLeft <= URGENT_HOURS) dueStatus = "dueSoon";
    else dueStatus = "normal";
  }

  onMount(() => {
    updateDueStatus();
    // update periodically (every 5 minutes)
    const interval = setInterval(updateDueStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<article
  class="task-card"
  aria-labelledby={"title-" + task.id}
  in:fly={{ y: 8, duration: 200 }}
  out:fade={{ duration: 150 }}
>
  <header class="task-head">
    <input
    class="check-box"
      aria-label="Toggle task completion"
      type="checkbox"
      checked={task.isComplete}
      onchange={() => {toggle(task.id)}}
    />
    <h3 id={"title-" + task.id}>{task.title}</h3>
  </header>

  {#if dueStatus !== "normal"}
    <div class="critically-urgent flags">
      {#if dueStatus === "dueSoon"}
          <p class="due-soon">Due Soon</p> 
      {:else if dueStatus === "overdue"}
          <p class="overdue">Overdue</p>
        {/if}
    </div>
  {/if}
  
  <p class="task-desc">{task.description}</p>
  
  <div class="actions">
    <button class="btn" onclick={openMove} aria-label="Move task">🚀</button>
    <button class="btn" onclick={() => {openEdit(task.id)}} aria-label="Edit task">📝</button>
    <button class="btn delete" onclick={() => {openDelete(task)}} aria-label="Delete task">🗑</button>
  </div>

  <div class="due-date">
    <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
  </div>

  <div class="priority">
    <p>Priority: {task.priority} </p>
    <p>Category: {task.category}</p>
  </div>
</article>

<!-- Modal Used To ADD Or EDIT A Task -->
<Modal open={showModal} onClose={handleCancel}>
  {#if moving}
    <MoveTask onCancel={handleCancel} onMove={moveTask} {task}/>
  {:else if deleting}
    <ConfirmDelete onCancel={handleCancel} onDelete={deleteTask} taskToDelete={task}/>
  {:else}
    <h3>{editing ? 'Edit Task' : 'Add A Task'}</h3>
    <TaskForm
      initial={initial()}
      onCancel={handleCancel}
      isEditing={editing}
      {taskToEdit}
    />
  {/if}
</Modal>