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
						$generalInformation.dataProvider.firstName,
						$generalInformation.dataProvider.initials,
						$generalInformation.dataProvider.familyName
					].join(' ')}
				/>
				<Point label="Email address" value={$generalInformation.dataProvider.email} />
				<Point label="ORCiD" value={'' + $generalInformation.dataProvider.orcId} />
				<Point label="Insitution name" value={$generalInformation.dataProvider.institutionName} />
				<Point
					label="Institution country"
					value={$generalInformation.dataProvider.institutionCountry}
				/>
				<Point label="ROR ID" value={'' + $generalInformation.dataProvider.rorId} />
			</div>
		</section>
		<section>
			<h3 class="text-xl font-medium mb-4">Dataset</h3>
			<div class="divide-y divide-placeholder divide-opacity-40 space-y-2">
				<Point label="Title" value={$generalInformation.dataset.title} />
				<Point label="Abstract" value={$generalInformation.dataset.abstract} />
				<Point label="Data access policy" value={$generalInformation.dataset.accessPolicy} />
				{#if $generalInformation.dataset.accessPolicy === 'Temporary embargo'}
					<Point label="Embargo end date" value={'' + $generalInformation.dataset.embargoEndDate} />
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
							<Point
								label="Crossref Funder ID"
								value={funder.noFunderId ? 'No funder ID provided' : '' + funder.id}
							/>
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
							<Point label="DOI" value={resource.doi} />
						</div>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>
