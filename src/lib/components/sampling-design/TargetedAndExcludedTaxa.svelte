<script lang="ts">
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import TextInput from '../TextInput.svelte';
	import Question from '../formControls/Question.svelte';
</script>

<Question
	question="Which taxa were the intended targets of the sample? Were any taxa intentionally excluded from sampling?"
	helpText=" If a specific list of target taxa was used in the survey, please upload it [here]."
	direction="column"
>
	<TextInput
		helpText="Multiple responses can be entered; separate the words or phrases using a comma"
		placeholder="Targeted taxa"
		label="Targeted taxa"
		bind:value={$samplingDesign.targetedAndExludedTaxa.targeted}
	/>
	<TextInput
		placeholder="Excluded taxa"
		label="Exluded taxa"
		helpText="Multiple responses can be entered; separate the words or phrases using a comma"
		bind:value={$samplingDesign.targetedAndExludedTaxa.excluded}
	/>
</Question>
