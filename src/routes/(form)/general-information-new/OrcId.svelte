<script lang="ts">
	import { Form, getFormField } from 'formsnap';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type $$Props = HTMLInputAttributes;
	const { value, setValue, actions, errors } = getFormField();
	let segmentCount = 0;

	$: if (typeof $value === 'string' && $value.length > 20) {
		setValue($value.slice(0, 20));
	}
	$: if (typeof $value === 'string' && $value.length > 0) {
		const isValidOrcId = /^\d{0,4}(?:-\d{0,4}){0,3}$/.test($value);

		if (isValidOrcId) {
			const matchedSegments = (
				/(\d{4,4})(?:-(\d{4,4}))?(?:-(\d{4,4}))?(?:-(\d{4,4}))?/.exec($value) || []
			).filter((element) => element !== undefined);
			matchedSegments.shift();

			console.log('matched segments', matchedSegments);

			if (matchedSegments.length > segmentCount) {
				const stringWithExtraSeparator =
					matchedSegments.length > 0 ? [...matchedSegments, ''].join('-') : $value;
				setValue(stringWithExtraSeparator);
				segmentCount++;
			}
		} else {
			setValue($value.slice(0, $value.length - 1));
		}
	}
</script>

<div class="flex flex-col">
	<Form.Label class="text-sm">ORCiD</Form.Label>
	<div class="flex items-center">
		<Form.Input
			class="bg-input px-4 py-3 border-none w-full placeholder:text-placeholder disabled:bg-input-disabled"
			bind:value={$value}
		/>
		<div class="text-red text-sm" use:actions.validation>
			{#if $errors}
				{$errors[0]}
			{/if}
		</div>
	</div>
</div>
