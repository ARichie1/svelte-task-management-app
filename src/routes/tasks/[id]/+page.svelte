<script lang="ts">
    import { parseISO, differenceInHours } from 'date-fns';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { derived } from 'svelte/store';
    import { taskStore, urgencyThreshold } from '$lib/stores/taskStores';
    import TaskForm from '$lib/components/TaskForm.svelte';
    import Modal from '$lib/components/shared/Modal.svelte';
    import ConfirmDelete from '$lib/components/shared/ConfirmDelete.svelte';
    import MoveTask from '$lib/components/shared/MoveTask.svelte';
    
    // Local state
    let showModal = $state(false)
    let showActionsMenu = $state(false)

    let moving = $state(false)
    let deleting = $state(false)
    let editing = $state(false)
    let taskToEdit = $state("")

    // Get The Task Id From The Route param
    let taskId = $state('')
    let taskIsAvailable = $state(false)
    taskId = page.params.id;

    // Load The Task Reactively Based On The ID Parameter In The Route
    const task = derived(taskStore, $tasks =>
        $tasks.find(t => t.id === taskId)
    );
    
    // Subscribe To Track When Task Is Available
    task.subscribe((value) => {
        if (value) {taskIsAvailable = true}
    });

    // Closes and Resets Modal
    let handleCancel = () => {
        showModal = false
        moving = editing = deleting = false 
    }

    // Opens Modal For MOVE, EDIT and DELETE
    const openMove = () => {
        moving = true; 
        showModal = true;
    }
    const openEdit = () => {
        if (!$task) return 
        editing = true; 
        taskToEdit = $task.id;
        showModal = true;
    }
    const openDelete = () => { 
        deleting = true;  
        showModal = true; 
    }

    // Callbacks, Fast Implementations Directly In The Tasks Store
    const toggle = () => {
        if ($task) {
            taskStore.toggleCompletionOptimistic($task.id);
        }
    }

    const moveTask = (id:string, newPriority:string) => {
        taskStore.setTaskQuadrant(id, newPriority)
        handleCancel()
    }

    const deleteTask = (id: string) => {
        taskStore.deleteTask(id);
        handleCancel()
        goto('/tasks')
    }

    // Use Reactive Variable To Keep Track Of The Time and Status
    let dueStatus = $state<"normal" | "dueSoon" | "overdue">("normal");

    // Calculation The Task Urgency Based Priority and Due Date
    const updateDueStatus = () => {
        if ($task) {  
            if (!$task.dueDate) return;

            const due = parseISO($task.dueDate);
            const hoursLeft = differenceInHours(due, new Date());

            if (hoursLeft <= 0) dueStatus = "overdue";
            else if (hoursLeft <= $urgencyThreshold) dueStatus = "dueSoon";
            else dueStatus = "normal";
        }
    }

    onMount(() => {
        updateDueStatus();
        // update periodically (every 5 minutes)
        const interval = setInterval(updateDueStatus, 5 * 60 * 1000);
        return () => clearInterval(interval);
    });
</script>

{#if taskIsAvailable}
    {#if $task}
        <div class="task-singlepage-container">
            <div class="task-singlepage-header">
                <div class="title-completion">
                    <input
                        class="check-box"
                        aria-label="Toggle task completion"
                        type="checkbox"
                        checked={$task.isComplete}
                        onchange={() => {toggle()}}
                    />
                    <h3>{$task.title}</h3>
                </div>

                <div class="due-flag">
                    {#if dueStatus !== "normal"}
                        <div class="critically-urgent flags">
                        {#if dueStatus === "dueSoon"}
                            <p class="due-soon">Due Soon</p> 
                        {:else if dueStatus === "overdue"}
                            <p class="overdue">Overdue</p>
                            {/if}
                        </div>
                    {/if}
                </div>

                <div class="actions desktop">
                    <button class="btn" onclick={openMove}>🚀</button>
                    <button class="btn" onclick={openEdit}>📝</button>
                    <button class="btn" onclick={openDelete}>🗑️</button>
                </div>
                <div class="action-menu-btn"><button class="btn" onclick={() => showActionsMenu = !showActionsMenu}>🟣</button></div>
                <div class="actions mobile" class:slide-left={showActionsMenu}>
                    <button class="btn" onclick={openMove}>🚀</button>
                    <button class="btn" onclick={openEdit}>📝</button>
                    <button class="btn" onclick={openDelete}>🗑️</button>
                </div>
            </div>

            <div class="task-singlepage-body">
                <div class="task-property">
                    <h4>Description</h4>
                    <p>{$task.description || 'No description provided.'}</p>
                </div>

                <div class="task-property">
                    <h4>Due Date</h4>
                    <p>{$task.dueDate ? new Date($task.dueDate).toLocaleString() : "No due date set"}</p>
                </div>

                <div class="multi-property">
                    <div class="task-property">
                        <h4>Priority</h4>
                        <p class="priority {$task.priority.toLowerCase().replace(/\s+/g, '')}">{$task.priority}</p>
                    </div>

                    <div class="task-quadrant">
                        <h4>Quadrant</h4>
                        <p>{$task.quadrant_title}</p>
                    </div>
                </div>

                <div class="multi-property">
                    <div class="task-property">
                        <h4>Category</h4>
                        <p>{$task.category}</p>
                    </div>

                    <div class="task-property">
                        <h4>Status</h4>
                        <p>{$task.isComplete ? "✔ Completed" : "🕓 In Progress ..."}</p>
                    </div>
                </div>
            </div>

            <!-- Modal Used To ADD Or EDIT A Task -->
            <Modal open={showModal} onClose={handleCancel}>
                {#if moving}
                    <MoveTask onCancel={handleCancel} onMove={moveTask} task={$task}/>
                {:else if deleting}
                    <ConfirmDelete onCancel={handleCancel} onDelete={deleteTask} taskToDelete={$task}/>
                {:else}
                    <h3>{editing ? 'Edit Task' : 'Add A Task'}</h3>
                    <TaskForm
                    initial={$task}
                    onCancel={handleCancel}
                    isEditing={editing}
                    {taskToEdit}
                    />
                {/if}
            </Modal>
        </div>

        {:else}
        <div class="task-singlepage-container not-found-page-container">
            <h2>404 - Task Not Found</h2>
            <p>The Task You Are Looking For Does Not Exist.</p>
            <button class="btn" onclick={() => goto('/tasks')}>Go Back</button>
        </div>
    {/if}
{:else}
    <div class="task-singlepage-container not-found-page-container">
        ... loading 
    </div>
{/if}
