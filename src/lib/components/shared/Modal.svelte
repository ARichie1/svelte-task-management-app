  
<script lang="ts">
  import { fly } from 'svelte/transition';
  
  let {open = false, onClose = () => {}} = $props()
</script>

{#if open}
  <div class="modal-overlay" on:click|self={() => onClose()}>
    <div class="modal" on:click|stopPropagation transition:fly={{y:8, duration:180}}>
      <slot />
    </div>
  </div>
{/if}

<style>
  .modal-overlay{
        position:fixed;
        inset:0;
        display:flex;align-items:center;
        justify-content:center;
        background:rgba(2,6,23,0.4);
        z-index:500;
    }

    .modal{
        width:520px;
        max-width:92%;
        background: var(--gradient);
        padding:18px;
        border-radius:12px;
    }
</style>