<script lang="ts">
    import {tasks, taskStore} from "$lib/stores/taskStores"
    import {validQuadrants, type Task, checkPriority} from "$lib/stores/types"

    const props = $props<{
        onCancel?: () => void;
        onMove?: (id: string, priority:string) => void;
        task: Task;
    }>();

    // Check The Selected Quadrant Priority And Move
    const moveTo = (newPriority: string) => {
        // let newQuadrantConfig = checkPriority(newPriority)
        props.onMove?.(props.task.id, newPriority);
    }
</script>
    
<div class="moveForm">
    <p style="text-transform: uppercase;">
        <small><em>Move</em></small>
        <span>{props.task.title}</span> 
        <small><em>From </em></small>
    </p>
    {#each $tasks as task (task.id)}
        {#if task.id === props.task.id}
            <div class="current-quadrant ghost">{props.task.quadrant_title}</div>
        {/if}
    {/each}
    <p><small><em>To</em></small></p>
    <ul class="quadrant-list">
        {#each validQuadrants as quadrant (quadrant.id)}
            {#if quadrant.priority !== props.task.priority}
                <li>
                    <button class="btn" onclick={() => {moveTo(quadrant.priority)}}>
                        {quadrant.title}
                    </button>
                </li>
            {/if}
        {/each}
    </ul>
    <div class="button-container">
        <button class="btn ghost small" onclick={() => props.onCancel?.()}>Cancel</button>
   </div>
</div>

<style>
    .moveForm{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    p{word-spacing: 10px;}
    small {text-transform: lowercase;}
    .current-quadrant{
        height: 40px; width: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        text-transform: uppercase;
        background: var(--backdrop);
        border-radius: 5px;
    }
    .quadrant-list{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .quadrant-list li{
        width: auto; height: 30px;
        background: var(--backdrop);
    }
    .quadrant-list button{
        height: 100%; width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
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
