<script lang="ts">
	import OrcId from './OrcId.svelte';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { Form } from 'formsnap';

	export let config: any;
</script>

<div class="col-span-2 flex justify-between gap-3">
	<Form.Field {config} name="firstName">
		<TextInput label="First name" placeholder="E.g. Sara" />
	</Form.Field>
	<Form.Field {config} name="middleInitials">
		<TextInput label="Middle initial(s)" placeholder="M. L." />
	</Form.Field>
	<Form.Field {config} name="familyName">
		<TextInput label="Family name(s)" placeholder="de Melo" />
	</Form.Field>
</div>
<Form.Field {config} let:actions name="ORCiD">
	<OrcId />
</Form.Field>
