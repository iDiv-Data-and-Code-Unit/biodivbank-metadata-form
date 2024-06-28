<script lang="ts">
	export let question = 'Question';
	export let step2Title = 'Step 2';
	export let step3Title = 'Step 3';
	export let steps = 1;

	let step2Height: number;
	let step3Height: number;
</script>

<div class="grid gap-8 w-full">
	<div class="grid gap-2">
		<h3 class="text-base">{question}</h3>
		<div class="h-px mt-1 mb-3" />
		<div class=""><slot /></div>
	</div>

	{#if steps > 1}
		<div class="grid gap-2">
			<h3 class="text-base" class:text-input-disabled={!step2Height}>{step2Title}</h3>
			<div class="bg-divider h-px mt-1 mb-3" />
			<div bind:clientHeight={step2Height} class=""><slot name="step-2" /></div>
		</div>
	{/if}

	{#if steps > 2}
		<div class="grid gap-2">
			<h3 class="text-base" class:text-input-disabled={!step3Height}>{step3Title}</h3>
			<div class="bg-divider h-px mt-1 mb-3" />
			<div bind:clientHeight={step3Height} class=""><slot name="step-3" /></div>
		</div>
	{/if}
</div>
