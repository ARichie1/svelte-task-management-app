<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Redirect to home page
  onMount(() => {
    const timer = setTimeout(() => {
      goto('/'); 
    }, 2000);

    return () => clearTimeout(timer); // Cleanup if component unmounts
  });
</script>

<svelte:head>
  <title>404 - Page Not Found</title>
</svelte:head>

<div class="not-found-page-container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Redirecting to homepage in 2 seconds...</p>
    <a href="/"><button class="btn">Go Back Now</button></a>
</div>

