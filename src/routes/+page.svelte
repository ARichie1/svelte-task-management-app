<script lang="ts">
    import { completionPercentage } from '$lib/stores/taskStores';
    import { validQuadrants } from "$lib/stores/types"
    import { fly } from 'svelte/transition';
    import MatrixQuadrant from '$lib/components/MatrixQuadrant.svelte';
    import Modal from '$lib/components/shared/Modal.svelte';
    import TaskForm from '$lib/components/TaskForm.svelte';
    import { pageWidth } from '$lib/stores/uiStore';

    let showModal = $state(false)
    const handleCancel = () => {showModal = false}
    const openAddTask = () => {showModal = true;}

    $effect(() => {
        console.log($pageWidth);
    })
</script>

<svelte:head>
  <title>Svelte Task Management App</title>
</svelte:head>

<div class="matrix-container" style="flex-basis: {$pageWidth}%;">
    <div class="matrix-container-header">
        <h2>Completed | {$completionPercentage}%</h2>
        <div><button class="btn add" onclick={openAddTask}>Add A New Task</button></div>
    </div>
   
    <!-- Load The Quadrants -->
    <div class="matrix-grid scrollable" in:fly={{ y: 8 }}>
        {#each validQuadrants as quadrant (quadrant.id)}
            <MatrixQuadrant info={quadrant} />
        {/each}
    </div>

    <!-- Modal Used To ADD Task To Any Quadrant -->
    <Modal open={showModal} onClose={handleCancel}>
        <h3>Add A Task</h3>
        <TaskForm onCancel={handleCancel}/>
    </Modal>
</div>

