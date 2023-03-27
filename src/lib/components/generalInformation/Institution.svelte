<script lang="ts">
	import Select from '../Select.svelte';
	import TextInput from '../TextInput.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import countries from './countries.json';
</script>

<div class="col-span-2 flex justify-between items-center gap-3">
	<TextInput
		label="Institution name"
		required
		placeholder="E.g. Institute of Biodiversity Studies"
		bind:value={$generalInformation.institutionName}
	/>
	<Select
		label="Institution country"
		required
		placeholder="Select country..."
		bind:value={$generalInformation.institutionCountry}
		options={countries.map((c) => c.en)}
	/>
</div>
<TextInput
	label="ROR ID"
	placeholder="xxxxxxxxx"
	pattern="'^0[a-z|0-9]{6}[0-9]{2}$"
	errorMsg="Please enter a valid ROR ID."
	bind:value={$generalInformation.ror}
/>
