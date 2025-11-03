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

<style>
  .not-found-page-container {
    width: 100%; height:90vh;
    padding-left: 10px;
    overflow-y: hidden;
    text-align: center;
    padding: 4rem 1rem;
  }

  .not-found-page-container h1 {
    font-size: 6rem;
    margin-bottom: 1rem;
  }

  .not-found-page-container h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

   a button {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        text-decoration: none;
        transition: background 0.2s;
    }
</style>
