<script lang="ts">
	import Multistep from '../Multistep.svelte';
	import Kingdoms from './Kingdoms.svelte';
	import Phylum from './Phylum.svelte';
</script>

<Multistep question="Which kingdoms are involved?" steps=2>
	<Kingdoms />
	<div slot="step-2" class="grid gap-8">
		<Phylum />
	</div>
</Multistep>
