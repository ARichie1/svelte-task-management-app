<script lang="ts">
    import { tasks, taskStore } from '$lib/stores/taskStores';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
</script>

<div class="task-singlepage-container">
    <div class="task-singlepage-header">
        <h2>Task | <span>Something</span></h2>
    </div>
    <div class="task-singlepage-body">


    </div>
</div>


<style>
    label { 
        display:flex; 
        flex-direction:column; 
        max-width:240px; 
    }
</style>