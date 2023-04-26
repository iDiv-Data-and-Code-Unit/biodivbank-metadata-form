<script lang="ts">
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import TextInput from '../TextInput.svelte';
	import Question from '../formControls/Question.svelte';
</script>

<Question
	question="Which taxa were the intended targets of the sample? Were any taxa intentionally excluded from sampling?"
	direction="column"
>
	<TextInput
		helpText="Multiple responses can be entered; separate the words or phrases using a comma"
		placeholder="E.g. Aves"
		label="Targeted taxa"
		bind:value={$samplingDesign.targetedAndExludedTaxa.targeted}
	/>
	<TextInput
		placeholder="E.g. Anatidae, raptors"
		label="Excluded taxa"
		helpText="Multiple responses can be entered; separate the words or phrases using a comma"
		bind:value={$samplingDesign.targetedAndExludedTaxa.excluded}
	/>
</Question>
