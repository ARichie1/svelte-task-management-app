<script lang="ts">
	import { mobileMenuState } from "$lib/stores/uiStore";
    import { selectedCategories } from "$lib/utils/findTasks";
    
    const props = $props<{
        menu_class?: string;
        closeMobileMenu?: () => void;
    }>();
    
    const menuItems = [
        {title: "Dashboard", href: "/", id: 0},
        {title: "All Tasks", href: "/tasks", id: 1},
        {title: "Categories", href: "/settings", id: 2},
        {title: "Settings", href: "/settings", id: 3},
    ]

    const clearSelectedCategory = () => {
        selectedCategories.update(list => [])
    }
</script>

<nav class={props.menu_class} class:show-mobile={$mobileMenuState}>
    <ul class="navigation">
        {#each menuItems as item (item.id)}
            <li><a href={item.href} class="nav-link"
                onclick={() => {
                    $mobileMenuState ? props.closeMobileMenu?.() : null;
                    item.href === "/tasks" ? selectedCategories.update(list => []) : null
                    }}
                >
                {item.title}
                </a>
            </li>
        {/each}
      </ul>
</nav>