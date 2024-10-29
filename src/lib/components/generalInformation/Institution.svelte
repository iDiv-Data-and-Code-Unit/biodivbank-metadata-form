<script lang="ts">
	import countries from './countries.json';
	import Select from '../Select.svelte';
	import TextInput from '../TextInput.svelte';
	import Ror from '../ROR.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';

	let notAvailable = false;
</script>

<div class="col-span-2 flex justify-between items-center gap-3">
	<TextInput
		label="Institution name"
		required
		placeholder="E.g. Institute of Biodiversity Studies"
		bind:value={$generalInformation.dataProvider.institutionName}
	/>
	<Select
		label="Institution country"
		required
		placeholder="Select country..."
		bind:value={$generalInformation.dataProvider.institutionCountry}
		options={countries.map((c) => c.en)}
	/>
</div>
<div>
	<Ror
		bind:value={$generalInformation.dataProvider.rorId}
		bind:notAvailable={$generalInformation.dataProvider.noRorId}
		name="ror-author-list"
		label="Institution ROR ID"
		maxLength={9}
		placeholder="XXXXXXXXX"
		invalidInputErrorMsg="A ROR ID must contain 9 alphanumeric characters."
		invalidatedErrorMsg="ROR ID does not exist, please check that you have typed it in correctly."
		confirmCheckboxMsg="No ROR ID available?"
		validatedMsg="ROR ID found."
	/>
</div>
