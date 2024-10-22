<script lang="ts">
	import Cross from '$lib/icons/Cross.svelte';
	import toast_, { type Toast as Toast_ } from 'svelte-french-toast';
	import { type ZodIssue } from 'zod';

	interface Toast extends Toast_ {
		incompleteIssues: ZodIssue[];
		step: string;
	}

	export let toast: Toast;
</script>

<div>
	<header class="flex justify-between items-center border-b border-min-contrast-gray/20 mb-4 pb-1">
		<h3 class="font-medium text-black-text flex items-center gap-1">
			Incomplete step <span class="text-xs font-normal">{toast.step}</span>
		</h3>
		<button on:click={() => toast_.dismiss(toast.id)}><Cross class="h-5 w-5" /></button>
	</header>
	<section>
		<p class="text-sm mb-2">
			Certain mandatory questions have not been answered on the previous screen. You can revise
			these at the end of the form, or return to complete the section at any point in the process.
		</p>
		{#if toast.incompleteIssues}
		<ul class="flex flex-col gap-1">
			{#each toast.incompleteIssues as {code, path, message } }
				<li class="text-sm flex items-center gap-2">
					<span>⚠️</span>
					<div class="flex-col">
						<div class="font-bold">{path.join(".")}</div>
					 <div>{message}</div>
					</div>
				</li>
			{/each}
		</ul>
		{/if}
	</section>
</div>

