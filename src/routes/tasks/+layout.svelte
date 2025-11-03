<script lang="ts">
    import { tasks, taskStore } from '$lib/stores/taskStores';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    let { children } = $props()
</script>

<div class="tasks-page-wrapper">
    <div class="tasks-page-header">
        <h2>Your Available Tasks | <span>{$tasks.length}</span></h2>
    </div>
    <div class="tasks-page-body scrollable">
        {@render children?.()}
    </div>
</div>
