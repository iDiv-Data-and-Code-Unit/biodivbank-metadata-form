<script lang="ts">
	import { step } from '$lib/stores/steps';
	import clsx from 'clsx';
	import StepButton from '$lib/components/formControls/StepButton.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	const steps = [
		'/general-information',
		'/dataset-overview',
		'/sampling-design-and-location',
		'/review'
	];

	$: {
		if (browser) {
			goto(steps[$step - 1]);
		}
	}
</script>

<header class="px-16 py-10 flex items-center justify-between border-b border-b-divider">
	<img class="h-12" src="/iDivLogo-short.jpg" alt="iDiv Logo" />
	<div class="flex gap-5">
		{#each steps as s, idx}
			<div class="flex items-center gap-5">
				<a
					href={s}
					class={clsx(
						'flex items-center justify-center rounded-full text-[10px] w-6 h-6 text-white ring-8 transition',
						$step === idx + 1 ? 'bg-tertiary-dark ring-tertiary' : 'bg-neutral ring-neutral-light'
					)}
				>
					<span>{idx + 1}</span>
				</a>
				{#if idx < steps.length - 1}
					<div
						class={clsx(
							'h-1 w-32 rounded-lg',
							$step >= idx + 2 ? 'bg-tertiary' : 'bg-neutral-light'
						)}
					/>
				{/if}
			</div>
		{/each}
	</div>
</header>

<main class="max-w-7xl mx-auto pt-20 py-48">
	<slot />
</main>

<div class="flex fixed bottom-10 justify-center inset-x-0 gap-5">
	<StepButton direction="prev" />
	<StepButton direction="next" />
</div>
