<script lang="ts">
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import Point from '$lib/components/review/Point.svelte';
	import ReviewGi from '$lib/components/review/ReviewGI.svelte';
	import ReviewDo from '$lib/components/review/ReviewDO.svelte';
	import ReviewSd from '$lib/components/review/ReviewSD.svelte';

	onMount(() => {
		step.set(4);
	});
</script>

<StepTitle title="Review" />
<div class="space-y-32">
	<ReviewGi />
	<ReviewDo />
	<ReviewSd />
</div>

<!-- firstName: string;
initials: string;
familyName: string;
orcidId: string;
noOrcidId: boolean;
email: string;
institutionName: string;
institutionCountry: string;
ror: string;
noRor: boolean;
datasetTitle: string;
datasetAbstract: string;
yearPublished: string;
accessPolicy: string;
embargoEndDate: string;
authors: Array<ListAuthor>;
funders: Array<Funder>;
resources: Array<Resource>; -->
