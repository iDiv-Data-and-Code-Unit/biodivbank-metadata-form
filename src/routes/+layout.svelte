<script>
	import '@fontsource/inter';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/700.css';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
</script>

<slot />
<Toaster />

<!-- <style>
	:global(body) {
		font-family: Inter;
	}
</style> -->
