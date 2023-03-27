<script lang="ts">
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';

	onMount(() => {
		step.set(4);
	});
</script>

<h1>Review</h1>
