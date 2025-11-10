<script lang="ts">
    import { urgencyThreshold, taskStore } from '$lib/stores/taskStores';
    import { onMount } from 'svelte';
    
    let urgentHours = $state($urgencyThreshold);
    let category = $state("");

    onMount(() => {
        urgencyThreshold.update(value => $urgencyThreshold);
    });

    const saveUrgency = () => {
        urgencyThreshold.update(value => urgentHours);
    }
    const addNewCategory = () => {
        console.log("added a new category")
    }
</script>

<div class="settings-page-container">
    <div class="settings-page-header">
        <h2>Settings</h2>
    </div>
    <div class="settings-page-body">
        <div class="settings-page-urgent setting-section">
            <h4>Urgent Threshold (hours)</h4>
            <p>Set the time you want to see the "Due Soon" message before a tasks is due. </p>
            <input type="number" min="1" bind:value={urgentHours} aria-label="Urgent threshold hours" />
            <button class="btn" onclick={saveUrgency}>Save</button>
        </div>
        <div class="settings-page-category setting-section">
            <h4>Add A Category</h4>
            <input type="text" min="1" bind:value={category} aria-label="Urgent threshold hours" />
            <button class="btn" onclick={addNewCategory}>Save</button>
        </div>
        <div class="settings-page-category setting-section">
            <ul>
                <li></li>
            </ul>
        </div>
        <div class="settings-page-category setting-section">
            <h4 style="text-align: center;">A Lot Of Implementations and Polishing Still Needed</h4>
            <h4>Made With Love By</h4>
            <h4>Akinmade Richard</h4>
        </div>
    </div>
</div>