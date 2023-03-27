<script lang="ts">
	import TextInput from '../TextInput.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import OrcId from '../OrcId.svelte';
</script>

<div class="col-span-2 flex justify-between gap-3">
	<TextInput
		label="First name"
		required
		placeholder="E.g. Sara"
		bind:value={$generalInformation.firstName}
	/>
	<TextInput
		label="Initial(s)"
		placeholder="M. L."
		pattern={'^ *?[A-Z]\\.(\\s[A-Z]\\.)* *?$'}
		errorMsg="Please enter initials in capitals separated \nby a dot and a space. Eg: E. G."
		bind:value={$generalInformation.initials}
	/>
	<TextInput
		label="Family name(s)"
		required
		placeholder="Garcia"
		bind:value={$generalInformation.familyName}
	/>
</div>
<OrcId
	bind:value={$generalInformation.orcidId}
	bind:notAvailable={$generalInformation.noOrcidId}
	name="orcId-author-list"
	label="ORCiD"
	maxLength={19}
	pattern="\d\d\d\d[-]\d\d\d\d[-]\d\d\d\d[-]\d\d\d\d"
	placeholder="Eg: 0000-0000-0000-0000"
	invalidInputErrorMsg="Only 4-digit numbers seperated by minus are permitted."
	invalidatedErrorMsg="ORCiD does not exist, please check that you have typed it in correctly."
	confirmCheckboxMsg="No ORCiD available?"
	validatedMsg="ORCiD found."
/>
<TextInput
	class="col-start-1"
	label="Email address"
	required
	placeholder="E.g. name@organization.domain"
	bind:value={$generalInformation.email}
/>
