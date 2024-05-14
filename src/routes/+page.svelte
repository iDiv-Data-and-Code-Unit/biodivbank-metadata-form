<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	const datasets = [
		{
			title: 'Chief Assurance Facilitator',
			updated: '12 days ago',
			creator: 'Don Grant',
			excerpt:
				'Doloribus nisi incidunt excepturi at. Animi dolorem dolorum dolores deserunt deserunt. Sed ipsam magnam. Odit praesentium ducimus deserunt dolorum animi aperiam ea maxime. Natus quam quod unde eos rerum libero laborum eligendi porro.'
		},
		{
			title: 'Chief Assurance Facilitator',
			updated: '12 days ago',
			creator: 'Don Grant',
			excerpt:
				'Doloribus nisi incidunt excepturi at. Animi dolorem dolorum dolores deserunt deserunt. Sed ipsam magnam. Odit praesentium ducimus deserunt dolorum animi aperiam ea maxime. Natus quam quod unde eos rerum libero laborum eligendi porro.'
		},
		{
			title: 'Chief Assurance Facilitator',
			updated: '12 days ago',
			creator: 'Don Grant',
			excerpt:
				'Doloribus nisi incidunt excepturi at. Animi dolorem dolorum dolores deserunt deserunt. Sed ipsam magnam. Odit praesentium ducimus deserunt dolorum animi aperiam ea maxime. Natus quam quod unde eos rerum libero laborum eligendi porro.'
		},
		{
			title: 'Chief Assurance Facilitator',
			updated: '12 days ago',
			creator: 'Don Grant',
			excerpt:
				'Doloribus nisi incidunt excepturi at. Animi dolorem dolorum dolores deserunt deserunt. Sed ipsam magnam. Odit praesentium ducimus deserunt dolorum animi aperiam ea maxime. Natus quam quod unde eos rerum libero laborum eligendi porro.'
		}
	];

	const trending = datasets.slice(2);
</script>

<div class="h-screen w-screen flex flex-col items-center">
	<header class="py-4">
		<img class="h-12" src="/iDivLogo-short.jpg" alt="iDiv Logo" />
	</header>
	<section class="bg-bee w-full bg-center bg-cover mb-12">
		<div
			class="w-full h-full py-40 flex flex-col items-center justify-center backdrop-brightness-75"
		>
			<h2 class="text-3xl font-bold text-white mb-4">Free and open access to biodiversity data</h2>
			<div
				class="w-5/12 flex items-center border broder-transparent focus-within:ring-2 ring-secondary bg-input px-4 py-2 rounded-md border-min-contrast-gray"
			>
				<input
					type="text"
					class="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-sm placeholder:text-min-contrast-gray"
					placeholder="Search"
				/>
				<SearchIcon />
			</div>
		</div>
	</section>
	<div class="flex gap-8 max-w-screen-lg w-full mb-20">
		<a href="#" class="w-60 bg-data bg-center bg-cover flex-1">
			<div class="flex flex-col items-center relative text-white justify-center h-full w-full py-6">
				<p class="text-lg font-semibold">Date Repository</p>
				<p>Explore</p>
			</div>
		</a>
		<a href="/general-information" class="w-60 bg-contribute bg-center bg-cover flex-1">
			<div
				class="flex flex-col items-center relative text-white justify-center h-full w-full backdrop-brightness-50 py-6"
			>
				<p class="text-lg font-semibold">Submission Portal</p>
				<p>Contribute</p>
			</div>
		</a>
	</div>
	<section class="w-full grid grid-cols-4 gap-12 px-20">
		<div class="col-span-1">
			<h2 class="text-xl font-semibold mb-4">Trending Datasets</h2>
			<div class="grid grid-cols-1 gap-4">
				{#each trending as dataset}
					<div class="border rounded-md border-min-contrast-gray overflow-hidden">
						<img src="/setimg.jpg" alt="" />
						<div class="p-4">
							<h3 class="font-semibold text-lg mb-2">{dataset.title}</h3>
							<div class="flex items-center gap-0.5 text-sm mb-2">
								<p class="underline">{dataset.creator}</p>
								<span>・</span>
								<p class="text-min-contrast-gray">{dataset.updated}</p>
							</div>
							<p>{dataset.excerpt}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="col-span-3">
			<h2 class="text-xl font-semibold mb-4">Newest Datasets</h2>
			<div class="grid grid-cols-3 gap-4">
				{#each datasets as dataset}
					<div class="border rounded-md border-min-contrast-gray overflow-hidden">
						<img src="/setimg.jpg" alt="" />
						<div class="p-4">
							<h3 class="font-semibold text-lg mb-2">{dataset.title}</h3>
							<div class="flex items-center gap-0.5 text-sm mb-2">
								<p class="underline">{dataset.creator}</p>
								<span>・</span>
								<p class="text-min-contrast-gray">{dataset.updated}</p>
							</div>
							<p>{dataset.excerpt}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>
