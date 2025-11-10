<script lang="ts">
    import { tasks, completionPercentage } from '$lib/stores/taskStores';
    let { children } = $props()
    import Modal from '$lib/components/shared/Modal.svelte';
    import TaskForm from '$lib/components/TaskForm.svelte';

    let showModal = $state(false)
    const handleCancel = () => {showModal = false}
    const openAddTask = () => {showModal = true;}
</script>

<div class="tasks-page-wrapper">
    <div class="tasks-page-header">
        <h4><span class="minize-head">Available</span> Tasks | <span>{$tasks.length}</span></h4>
        <div class="right-side">
            <h4>Completed | {$completionPercentage}%</h4>
            <button class="btn" onclick={openAddTask}>Add A New Task</button>
        </div>
    </div>
    <div class="tasks-page-body scrollable">
        {@render children?.()}
    </div>
</div>

<!-- Modal Used To ADD Task To Any Quadrant -->
<Modal open={showModal} onClose={handleCancel}>
    <h3>Add A Task</h3>
    <TaskForm onCancel={handleCancel}/>
</Modal>