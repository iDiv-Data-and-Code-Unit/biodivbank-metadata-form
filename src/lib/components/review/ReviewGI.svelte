<script>
	import { generalInformation } from '$lib/stores/generalInformation';
	import Point from './Point.svelte';
</script>

<div>
	<h2 class="text-2xl font-medium mb-6">General Information</h2>
	<div class="space-y-12">
		<section>
			<h3 class="text-xl font-medium mb-4">Data Provider</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point
					label="Name"
					value={[
						$generalInformation.firstName,
						$generalInformation.initials,
						$generalInformation.familyName
					].join(' ')}
				/>
				<Point label="Email address" value={$generalInformation.email} />
				<Point label="ORCiD" value={$generalInformation.orcidId} />
				<Point label="Insitution name" value={$generalInformation.institutionName} />
				<Point label="Institution country" value={$generalInformation.institutionCountry} />
				<Point label="ROR ID" value={$generalInformation.ror} />
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Dataset</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point label="Title" value={$generalInformation.datasetTitle} />
				<Point label="Abstract" value={$generalInformation.datasetAbstract} />
				<Point label="Data access policy" value={$generalInformation.accessPolicy} />
				{#if $generalInformation.accessPolicy === 'Temporary embargo'}
					<Point label="Embargo end date" value={$generalInformation.embargoEndDate} />
				{/if}
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Dataset creator(s)</h3>
			<div class="space-y-4">
				{#each $generalInformation.authors as author}
					<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
						<Point
							label="Name"
							value={[author.firstName, author.initials, author.familyName].join(' ')}
						/>
						<Point label="ORCiD" value={author.orcId ?? ''} />
					</div>
				{/each}
			</div>
		</section>
		{#if $generalInformation.funders.length}
			<section>
				<h3 class="text-xl font-medium mb-4">Funding bodies</h3>
				<div class="space-y-4">
					{#each $generalInformation.funders as funder}
						<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
							<Point label="Funder name" value={funder.name} />
							<Point label="Crossref Funder ID" value={funder.funderId} />
							<Point label="Grant number" value={funder.grantNumber} />
						</div>
					{/each}
				</div>
			</section>
		{/if}
		{#if $generalInformation.resources.length}
			<section>
				<h3 class="text-xl font-medium mb-4">Related resources</h3>
				<div class="space-y-4">
					{#each $generalInformation.resources as resource}
						<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
							<Point label="Resource type" value={resource.type} />
							<Point label="DOI" value={resource.DOI} />
						</div>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>
