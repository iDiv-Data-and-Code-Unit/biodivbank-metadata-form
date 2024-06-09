<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { imageOverlay } from 'leaflet';

	const datasets = [
		{
			title: 'Title',
			img: 'flower.jpeg',
			date: 'Date',
			excerpt:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec viverra  elit. Sed vitae libero vel orci venenatis rhoncus ut vel augue. Nam vel  suscipit nibh.'
		},
		{
			title: 'Title',
			img: 'spider.jpeg',
			date: 'Date',
			excerpt:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec viverra  elit. Sed vitae libero vel orci venenatis rhoncus ut vel augue. Nam vel  suscipit nibh.'
		},
		{
			title: 'Title',
			img: 'fungus.png',
			date: 'Date',
			excerpt:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec viverra  elit. Sed vitae libero vel orci venenatis rhoncus ut vel augue. Nam vel  suscipit nibh.'
		},
		{
			title: 'Title',
			img: 'fish.jpeg',
			date: 'Date',
			excerpt:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec viverra  elit. Sed vitae libero vel orci venenatis rhoncus ut vel augue. Nam vel  suscipit nibh.'
		}
	];

	const trending = datasets.slice(2);
</script>

<div class="h-screen w-screen flex flex-col items-center mb-20 antialiased">
	<header class="py-4 w-full px-12 flex justify-start">
		<img class="h-12" src="/iDivLogo-short.jpg" alt="iDiv Logo" />
	</header>
	<section class="bg-bee w-full bg-center bg-cover mb-16">
		<div
			class="w-full h-full py-40 flex flex-col items-center justify-center backdrop-brightness-50"
		>
			<h2 class="text-3xl font-semibold text-white mb-10">
				Free and open access to biodiversity data
			</h2>
			<form
				target="_blank"
				action="http://idiv-biodivbank.inf-bb.uni-jena.de/ddm/publicsearch"
				method="post"
				class="w-5/12 flex items-center border broder-transparent focus-within:ring-2 ring-secondary bg-input px-5 py-2 rounded-md border-min-contrast-gray"
			>
				<input type="hidden" name="FilterList" value="All" />
				<input type="hidden" name="searchType" value="new" />
				<input
					type="text"
					name="autoComplete"
					class="w-full bg-transparent border-none rounded-lg outline-none focus:ring-0 placeholder:text-sm placeholder:text-placeholder"
					placeholder="Search"
				/>
				<button>
					<SearchIcon />
				</button>
			</form>
		</div>
	</section>
	<div class="flex gap-20 max-w-screen-lg justify-center w-full mb-20">
		<!-- <a href="#" class="w-60 flex-1"> -->
		<div
			class="flex flex-col gap-2 items-center relative text-black-text justify-center h-full py-2"
		>
			<p class="text-xl font-semibold">Data Repository</p>
			<a
				href="http://idiv-biodivbank.inf-bb.uni-jena.de/ddm/PublicSearch"
				class="text-secondary underline text-lg">Explore</a
			>
		</div>
		<!-- </a> -->
		<div class="h-full w-px bg-placeholder" />
		<!-- <a href="/general-information" class="w-60 bg-contribute bg-center bg-cover flex-1"> -->
		<div
			class="flex flex-col gap-2 items-center relative justify-center text-black-text h-full py-2"
		>
			<p class="text-xl font-semibold">Submission Portal</p>
			<a
				href="http://idiv-biodivbank.inf-bb.uni-jena.de/Account/Login"
				class="text-primary underline text-lg">Contribute</a
			>
		</div>
		<!-- </a> -->
	</div>
	<p class="text-lg text-black-text mb-28">
		BiodivBank is a global repository for data on species abundances within ecological communities
	</p>
	<section class="w-full px-20 pb-28">
		<h2 class="text-2xl font-semibold mb-6">In the spotlight</h2>
		<div class="grid grid-cols-4 gap-8">
			{#each datasets as dataset}
				<div class="rounded-xl overflow-hidden border text-black-text border-min-contrast-gray/20">
					<img src={dataset.img} class="w-full h-56 object-cover" alt="" />
					<div class="pt-6 px-8 pb-4">
						<h3 class="font-semibold text-lg mb-5">{dataset.title}</h3>
						<p class="mb-5 text-min-contrast-gray text-sm">{dataset.excerpt}</p>
						<div class="flex justify-between">
							<a href="#" class="underline text-xs">Authors</a>
							<p class="text-xs">{dataset.date}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
	<footer class="w-full flex gap-8 px-20 py-6 border-t border-min-contrast-gray/20">
		<a href="#">Data Policy</a>
		<div class="w-px bg-placeholder" />
		<a href="#">Contact us</a>
		<div class="w-px bg-placeholder" />
		<a href="#">Imprint</a>
	</footer>
</div>
