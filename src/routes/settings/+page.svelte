<script lang="ts">
    import { taskStore } from '$lib/stores/taskStores';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    
    let urgentHours = $state(48);
    let category = $state("");

    onMount(() => {
        const s = get(taskStore) as any;
        urgentHours = s.urgentHours ?? 48;
    });

    function save() {
        taskStore.setUrgentHours(Number(urgentHours));
        alert('Settings saved');
    }
</script>

<div class="settings-page-container">
    <div class="settings-page-header">
        <h2>Settings</h2>
    </div>
    <div class="settings-page-body">
        <div class="settings-page-urgent setting-section">
            <h4>Urgent threshold (hours)</h4>
            <input type="number" min="1" bind:value={urgentHours} aria-label="Urgent threshold hours" />
            <button class="btn" onclick={save}>Save</button>
        </div>
        <div class="settings-page-category setting-section">
            <h4>Add A Category</h4>
            <input type="text" min="1" bind:value={category} aria-label="Urgent threshold hours" />
            <button class="btn" onclick={save}>Save</button>
        </div>
        <div class="settings-page-category setting-section">
            <h4 style="text-align: center;">A Lot Of Implementations and Polishing Still Needed</h4>
            <h4>Made With Love By</h4>
            <h4>Akinmade Richard</h4>
        </div>
    </div>
</div>