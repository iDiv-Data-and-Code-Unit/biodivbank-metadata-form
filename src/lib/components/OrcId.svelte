<script lang="ts">
	import CheckIcon from '$lib/icons/Check.svelte';
	import CrossIcon from '$lib/icons/Cross.svelte';
	import Spinner from '$lib/icons/Spinner.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';

	type ValidityStatus = 'neutral' | 'invalid' | 'valid' | 'loading' | 'invalidated' | 'validated';

	export let placeholder: string;
	export let maxLength: number;
	export let pattern: string;
	export let validatedMsg: string;
	export let invalidatedErrorMsg: string;
	export let invalidInputErrorMsg: string;
	export let confirmCheckboxMsg: string;
	export let value: string | undefined;
	export let notAvailable: boolean = false;
	export let name: string;
	export let label: string;
	export let required: boolean = false;

	let validityStatus: ValidityStatus = 'neutral';

	// if(notAvailable ===	undefined || notAvailable === '') notAvailable = false;

	const handleInput = (event: Event) => {
		event.preventDefault();

		let e = event as InputEvent;
		let el = event.currentTarget as HTMLInputElement;

		let foo = el.value.split('-').join('');

		if (el.value.length === 19) {
			el.classList.add('intermediary-validation');
			validityStatus = 'valid';

			// validate against api
			validityStatus = 'loading';

			let orcIdUserUrl = 'https://pub.orcid.org/v3.0/' + el.value;

			const requestObj = new Request(orcIdUserUrl, {
				method: 'GET',
				headers: { Accept: 'application/json' },
				redirect: 'follow'
			});

			fetch(requestObj).then(async (res) => {
				if (res.status === 200) {
					validityStatus = 'validated';
					const json = await res.json();
					console.log(json);
					$generalInformation.dataProvider.firstName = json.person.name['given-names'].value;
					$generalInformation.dataProvider.familyName = json.person.name['family-name'].value;
					// console.log(
					// 	json.person.name['given-names'].value + ' ' + json.person.name['family-name'].value
					// );
					// handleFormElChange(event, formElPath);
					el.setCustomValidity('');
				} else {
					validityStatus = 'invalidated';
					el.setCustomValidity('OrcId does not exist...');
				}
			});
		} else {
			el.classList.remove('intermediary-validation');
			validityStatus = 'neutral';
			el.setCustomValidity('');
		}

		//allows user to manually add hyphon to reduce confusion
		if (e.data === '-') return;

		//automatically adds a hyphon while user is typing
		if (foo.length > 0) {
			el.value = foo.match(new RegExp('.{1,4}', 'g'))?.join('-') as string;
		}
	};

	const handleChange = (event: Event) => {
		let el = event.currentTarget as HTMLInputElement;
		if (el.value.length === 0) {
			validityStatus = 'neutral';
			return;
		}
		event.preventDefault();
		if (el.value.length !== 19) {
			validityStatus = 'invalid';
			el.classList.add('intermediary-validation');
			el.setCustomValidity('Input too short...');
		} else {
			el.classList.remove('intermediary-validation');
			el.setCustomValidity('');
		}
	};
</script>

<div class="form-el">
	<label for={name} class="text-sm">
		{label}
		{#if required}
			<span class="text-error">*</span>
		{/if}
	</label>
	<section>
		<label class="relative">
			<span class="absolute inset-y-0 flex items-center pl-2">
				<img inert={true} class="w-4 h-4" src="/orcid_16x16.webp" alt="orcId Icon" />
			</span>
			<span
				class:hidden={!(validityStatus === 'loading')}
				class="absolute inset-y-0 flex items-center right-0 mr-2"
			>
				<Spinner classes="transition scale-[25%]" />
			</span>
			<span
				class:hidden={!(validityStatus === 'validated')}
				class="absolute flex items-center right-0 inset-y-0"
			>
				<CheckIcon class="transition w-8 h-8 text-primary scale-[65%]" />
			</span>
			<span
				class:hidden={!(validityStatus === 'invalidated')}
				class="absolute flex items-center right-0 inset-y-0"
			>
				<CrossIcon class="transition w-8 h-8 text-error scale-[65%]" />
			</span>
			<input
				id={name}
				bind:value
				{placeholder}
				type="text"
				maxlength={maxLength}
				{pattern}
				disabled={notAvailable}
				class="bg-input disabled:bg-input-disabled px-8 rounded-md py-3 border-none w-full placeholder:text-placeholder/50"
				on:change={handleChange}
				on:input={handleInput}
			/>
		</label>
		<br />
		<div class:hidden={validityStatus === 'neutral'} class="text-xs text-error mr-1 mt-2">
			<span class:hidden={!(validityStatus === 'invalid')}>{invalidInputErrorMsg}</span>
			<span class:hidden={!(validityStatus === 'invalidated')}>{invalidatedErrorMsg}</span>
			<span class="text-primary" class:hidden={!(validityStatus === 'validated')}
				>{validatedMsg}</span
			>
		</div>
		<div class="mt-1" class:hidden={!(validityStatus === 'neutral' && !value)}>
			<label class="text-sm mr-1"
				><span> {confirmCheckboxMsg}</span>
				<input type="checkbox" class="ml-1 !w-4 !h-4" bind:checked={notAvailable} />
			</label>
		</div>
	</section>
</div>

<!-- checked={!(validityStatus === ValidityStatus.NEUTRAL && !value)} /> -->
