<script lang="ts">
    import { completionPercentage } from '$lib/stores/taskStores';
    import { tweened } from 'svelte/motion';

    // Access props via $props
    const props = $props<{
        menu_class: string;
    }>();
    let menu_class = props.menu_class

    let percent = $state(0);
    const animated = tweened(0, { duration: 400 });

    const unsubscribe = completionPercentage.subscribe((v) => {
    animated.set(v);
    });

    animated.subscribe((v) => percent = Math.round(v));
</script>

<nav class={menu_class}>
    <ul class="navigation">
        <li><a href="/" class="nav-link">Dashboard</a></li>
        <li><a href="/tasks" class="nav-link">All Tasks</a></li>
        <li><a href="/settings" class="nav-link">Categories</a></li>
        <li><a href="/settings" class="nav-link">Settings</a></li>
      </ul>
</nav>