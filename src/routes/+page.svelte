<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { imageOverlay } from 'leaflet';

	const datasets = [
		{
			title: 'Title',
			img: 'https://s3-alpha-sig.figma.com/img/4ac2/f682/9874887e3f026d3b468bdcc82f822241?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AA6rCVkKf8A3XJH2z5XIsJ38WdqkqCm7EHGqjdXZP2FNEyInYt5p857ipXhNbtSvRRYwAMNk336WpuwRqMVD8y2Mdl86zLNicdhc6n0S2fW1slTuMWq0eEIx8LV6TdM0VtjpSokTYU-bKwk6C7GTtd-7vmBMnZ0LIf-5vycjhg8WE7kzsOFdy-LZhdyEWzBWiUYZ4KgupCzWolwsdeZsDWZoXjljI0cg6CpfFsI2brPIEIAGifr4vTT9Pu-2taIXuccAgiDJ3B7bdPaZCwR20aNA5GF1Ll8YIJpGTwz7k~rRChalR4dxgSYDcXPks~wk0J2SLJ6SxZT~CQOJ8uNLxg__',
			date: 'Date',
			excerpt:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec viverra  elit. Sed vitae libero vel orci venenatis rhoncus ut vel augue. Nam vel  suscipit nibh.'
		},
		{
			title: 'Title',
			img: 'https://s3-alpha-sig.figma.com/img/551a/2b6f/1a57561974b45dc755998daabc7ca299?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e3VQBqPkKO628PsiRKdOMzjHq4koNkGRTZJtS2W9CA7tkSrO1fDQt~VjBS-6-YVgEyYQ-vyMWhYv6KtheO5bto2os8ZBi54xkJkLfOWbg~rld~LIqobnvA-BQ04oJyf--8b7U7KCyE4K5G6bana3xn9aYM2YZwiJ-TIgM7gS1owVuHS5gzspfhor~8vOSdZ7UzaO8NqaFrCslaFU3WHy4I6QUJsS2hGqA6dwboULvreKuGdKNzRtcPtQIy3w-Xi61DJrikQ0EHLDervMR7E07iasgccKDLf1yEzs90z2DQxRZOoT8EpBtgs5-JNZcPvoHBr6Uf~C9NfcEtTqHfuxCA__',
			date: 'Date',
			excerpt:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec viverra  elit. Sed vitae libero vel orci venenatis rhoncus ut vel augue. Nam vel  suscipit nibh.'
		},
		{
			title: 'Title',
			img: 'https://s3-alpha-sig.figma.com/img/0187/f4ca/c33447af451ff29971d1282ac671a2a1?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n7R4vA9kYDv6THcwm36~9e0n82LJ6KA6PiU921Bz-el2hzhCzzruXziPWNECI3Eg3IDtLvTpKaZndU98JhtYGtvPfLoLKGZv9-L~Y6-0xMGsuc-StugaUm8r5SkuYOKw4nwVNz2DBX85g8ugYbB9x5um8CvniJ4t87qbLEdvyKw~G3ujuPrQaQzQBVknNNsPzbwtyTkRvQ7ZL6Y0bsvO6GTrqcn-KjbY5eovHplnG1j-1HtRoka4-5YVVHp8b0NeDgq8QnIwgq4VRpQkt3hH2YWoRM~jsQKcWDfE5uquDJMUNJDa25Cu7OnSEtkKTLKdYTzQKqNA6ToGeYBlUW-6QQ__',
			date: 'Date',
			excerpt:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec viverra  elit. Sed vitae libero vel orci venenatis rhoncus ut vel augue. Nam vel  suscipit nibh.'
		},
		{
			title: 'Title',
			img: 'https://s3-alpha-sig.figma.com/img/cf30/c406/5a2d75da2f048cdd87026ed8cd5aafb5?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=afpSCt7Mp~07p8NSoVANzzW1QU7XGNMVaZUAM4ikm2n~qsKk01Zx0crM1o7wK0sbsJvrsRLZaFe3vKCIrJcB0Ez42XeBstOwUBBSfJJDQdh6SHcHjrOAdXUUHs--3EXQxbIIRlvdDDTYgLXlu2-X5w3Bo4m8y9v6vvVB4CLUXn7rY3Odu2t2B-hfkJlivy7NW~x762AYNdYqmFlEe54aEg2o8PAtq~c6p7FUsAwEeg4ow52dPl5qvVM97q5aYNartM62fvw8NZFxqn1cEtMWkuch7UHaGFq1tbDr2a2jIUNqj~xW9UKZPHNLRg3BOT1k98TVfdej8pIFWMWrpYeGhA__',
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
			<div
				class="w-5/12 flex items-center border broder-transparent focus-within:ring-2 ring-secondary bg-input px-5 py-2 rounded-md border-min-contrast-gray"
			>
				<input
					type="text"
					class="w-full bg-transparent border-none rounded-lg outline-none focus:ring-0 placeholder:text-sm placeholder:text-placeholder"
					placeholder="Search"
				/>
				<SearchIcon />
			</div>
		</div>
	</section>
	<div class="flex gap-20 max-w-screen-lg justify-center w-full mb-20">
		<!-- <a href="#" class="w-60 flex-1"> -->
		<div
			class="flex flex-col gap-2 items-center relative text-black-text justify-center h-full py-2"
		>
			<p class="text-xl font-semibold">Date Repository</p>
			<a href="#" class="text-secondary underline text-lg">Explore</a>
		</div>
		<!-- </a> -->
		<div class="h-full w-px bg-placeholder" />
		<!-- <a href="/general-information" class="w-60 bg-contribute bg-center bg-cover flex-1"> -->
		<div
			class="flex flex-col gap-2 items-center relative justify-center text-black-text h-full py-2"
		>
			<p class="text-xl font-semibold">Submission Portal</p>
			<a href="/general-information" class="text-primary underline text-lg">Contribute</a>
		</div>
		<!-- </a> -->
	</div>
	<p class="text-lg text-black-text mb-28">
		BiodivBank is a global repository for data on species abundances within ecological communities
	</p>
	<section class="w-full px-44 pb-28">
		<h2 class="text-2xl font-semibold mb-6">In the spotlight</h2>
		<div class="grid grid-cols-2 2xl:grid-cols-4 gap-16">
			{#each datasets as dataset}
				<div class="rounded-xl overflow-hidden border text-black-text border-min-contrast-gray/20">
					<img src={dataset.img} class="w-full h-56 object-cover" alt="" />
					<div class="pt-6 px-8 pb-4">
						<h3 class="font-semibold text-lg mb-5">{dataset.title}</h3>
						<p class="mb-5 text-min-contrast-gray">{dataset.excerpt}</p>
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
