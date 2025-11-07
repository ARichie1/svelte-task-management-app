<script lang="ts">
    import type { Task } from "$lib/stores/types";
     const props = $props<{
        onCancel?: () => void;
        onDelete?: (id: string) => void;
        taskToDelete?: Task;
    }>();
</script>
    
<div class="deleteForm">
    {#if props.taskToDelete}
        <h3 style="text-transform: uppercase; text-align:center;">
            Are You Want To Delete This Task ?</h3>
        <div class="task-to-delete">
            <p>{props.taskToDelete.title}</p>
        </div>
    {:else}
         <h3 style="text-transform: uppercase; text-align:center;">
            You About To Delete All Your Tasks ?</h3>
    {/if}
    <div class="button-container">
        <button class="btn ghost small" onclick={() => props.onCancel?.()}>Cancel</button>
        <button class="btn small delete" onclick={() => {props.taskToDelete ? props.onDelete?.(props.taskToDelete.id) : props.onDelete?.()}}>Delete</button>
    </div>
</div>

<style>
    .deleteForm{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    p{
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }
    p:nth-child(2){
        height: 40px; width: 200px;
        display: flex; align-items: center;
        justify-content: center;
        background: var(--accent);
        text-align: center;
        border-radius: 7px;
        color: var(--text)
    }
    .button-container{
        height: 50px;
        width: 100%; margin-top: 50px;
        display: flex; justify-content: space-evenly;
    }
    .button-container button{
        flex-basis: 100px; height: 30px;
    }
</style>
