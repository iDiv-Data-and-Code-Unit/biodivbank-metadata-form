<script lang="ts">
	import TextInput from '../TextInput.svelte';
	import Select from '../Select.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import Textarea from '../Textarea.svelte';
</script>

<TextInput
	class="col-start-1"
	label="Title"
	required
	placeholder="Dataset title"
	maxlength={100}
	helpText="See [here] for examples of a good title. Allowed: 100 characters."
	bind:value={$generalInformation.datasetTitle}
/>
<Textarea
	class="col-start-1"
	label="Abstract"
	required
	rows={8}
	placeholder="Dataset abstract"
	maxlength={1500}
	helpText="Note that the short summary of a dataset is not the same as the abstract of any accompanying paper! See [here] for an explanation of what content should be included and an example. Allowed: 1500 characters."
	bind:value={$generalInformation.datasetAbstract}
/>
<!-- <TextInput
	class="col-start-1"
	label="Year published"
	placeholder="Year published"
	bind:value={$generalInformation.yearPublished}
/> -->
<Select
	class="col-start-1"
	label="Access Policy"
	placeholder="Select an access policy..."
	bind:value={$generalInformation.accessPolicy}
	options={[
		'Open - CC0 1.0',
		'Open - CC BY 4.0',
		'Temporary embargo',
		'Request from author',
		'Restricted'
	]}
/>
