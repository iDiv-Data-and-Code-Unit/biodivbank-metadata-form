<script lang="ts">
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import { step } from '$lib/stores/steps';
	import { onMount } from 'svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import ReviewGi from '$lib/components/review/ReviewGI.svelte';
	import ReviewDo from '$lib/components/review/ReviewDO.svelte';
	import ReviewSd from '$lib/components/review/ReviewSD.svelte';
	import { params } from '$lib/stores/paramsStore';
	import { datasetOverview } from '$lib/stores/datasetOverview';

	let disabled = false;
	let promise = Promise.resolve();

	async function submitForm() {
		const body = {
			'@id': $params.id,
			generalInformation: {
				'@ref': '',
				'@partyId': '',
				dataProvider: {
					'@ref': '',
					'@partyId': '',
					firstName: formatData($generalInformation.firstName),
					initial: formatData($generalInformation.initials),
					familyName: formatData($generalInformation.familyName),
					orcId: formatData($generalInformation.orcidId),
					noOrcId: formatData($generalInformation.noOrcidId),
					email: formatData($generalInformation.email),
					institutionName: formatData($generalInformation.institutionName),
					institutionCountry: formatData($generalInformation.institutionCountry),
					rorId: formatData($generalInformation.ror),
					noRorId: formatData($generalInformation.noRor)
				},
				authors: [
					$generalInformation.authors.map((author) => ({
						'@ref': '',
						'@partyId': '',
						firstName: formatData(author.firstName),
						initials: formatData(author.initials),
						familyName: formatData(author.familyName),
						orcId: formatData(author.orcId),
						primaryContact: formatData(author.primaryContact)
					}))
				],
				funders: [
					$generalInformation.funders.map((funder) => ({
						'@ref': '',
						'@partyId': '',
						name: formatData(funder.name),
						id: formatData(funder.id),
						noFunderId: formatData(funder.noFunderId),
						grantNumber: formatData(funder.grantNumber)
					}))
				],
				resources: [
					$generalInformation.resources.map((resource) => ({
						'@ref': '',
						'@partyId': '',
						type: formatData(resource.type),
						url: formatData(resource.DOI)
					}))
				],
				dataset: {
					'@ref': '',
					'@partyId': '',
					title: formatData($generalInformation.datasetTitle),
					abstract: formatData($generalInformation.datasetAbstract),
					accessPolicy: formatData($generalInformation.accessPolicy),
					license: formatData($generalInformation.license),
					embargoEndDate: formatData($generalInformation.embargoEndDate)
				}
			},
			datasetOverview: {
				'@ref': '',
				'@partyId': '',
				dataOrigin: {
					'@ref': '',
					'@partyId': '',
					originalOrCompiledDataset: formatData($datasetOverview.originalOrCompiledDataset),
					currentOrLegacyDataset: $datasetOverview.currentOrLegacyDataset.map(formatData),
					dataSource: $datasetOverview.dataSource.map(formatData)
				},
				temporalScope: {
					'@ref': '',
					'@partyId': '',
					start: formatData($datasetOverview.temporalScopeStart),
					end: formatData($datasetOverview.temporalScopeEnd)
				},
				geographicScope: {
					'@ref': '',
					'@partyId': '',
					extent: formatData($datasetOverview.spatialScope),
					countries: $datasetOverview.countries.map(formatData),
					marineRegions: $datasetOverview.marineRegions.map(formatData),
					fieldStation: {
						'@ref': '',
						'@partyId': '',
						name: formatData($datasetOverview.fieldStation),
						rorId: formatData($datasetOverview.fieldStationROR),
						noRorId: formatData($datasetOverview.fieldStationNoROR)
					}
				},
				realm: {
					'@ref': '',
					'@partyId': '',
					core: $datasetOverview.coreRealms.map(formatData),
					transitional: $datasetOverview.transitionalRealms.map(formatData)
				},
				biome: {
					'@ref': '',
					'@partyId': '',
					core: {
						'@ref': '',
						'@partyId': '',
						freshWater: $datasetOverview.coreRealmBiomes.map(formatData),
						terrestrial: $datasetOverview.coreRealmBiomes.map(formatData),
						marine: $datasetOverview.coreRealmBiomes.map(formatData),
						subterranean: $datasetOverview.coreRealmBiomes.map(formatData)
					},
					transitional: {
						'@ref': '',
						'@partyId': '',
						freshWaterMarine: $datasetOverview.transitionalRealmBiomes.map(formatData),
						terrestrialFreshWater: $datasetOverview.transitionalRealmBiomes.map(formatData),
						marineTerrestrial: $datasetOverview.transitionalRealmBiomes.map(formatData),
						marineFreshWaterTerrestrial: $datasetOverview.transitionalRealmBiomes.map(formatData),
						subterraneanFreshWater: $datasetOverview.transitionalRealmBiomes.map(formatData),
						subterraneanMarine: $datasetOverview.transitionalRealmBiomes.map(formatData)
					}
				},
				taxonomicScope: {
					'@ref': '',
					'@partyId': '',
					kingdom: $datasetOverview.kingdoms.map(formatData),
					animalia: $datasetOverview.subDivisions.map(formatData),
					fungi: $datasetOverview.subDivisions.map(formatData),
					plantae: $datasetOverview.subDivisions.map(formatData),
					chromista: $datasetOverview.subDivisions.map(formatData),
					protozoa: $datasetOverview.subDivisions.map(formatData),
					archaea: $datasetOverview.subDivisions.map(formatData),
					bacteria: $datasetOverview.subDivisions.map(formatData)
				}
			}
		};
		console.log(JSON.stringify(body, null, 2));
		const response = await self.fetch(
			`http://idiv-biodivbank.inf-bb.uni-jena.de/api/metadata/${$params.id}`,
			{
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + $params.auth
				},
				body: JSON.stringify(body)
			}
		);
		if (response.ok) {
			window.parent.postMessage('save', '*');
		} else {
			throw new Error('Unexpected Error');
		}
	}

	function handleClick() {
		// Now set it to the real fetch promise
		promise = submitForm();
		disabled = true;
	}

	function formatData<T>(value: T) {
		return {
			'@ref': '',
			'@partyId': '',
			'#text': value
		};
	}

	onMount(() => {
		step.set(4);
	});
</script>

<StepTitle title="Review" />
<div class="space-y-32">
	<ReviewGi />
	<ReviewDo />
	<ReviewSd />
	<div>
		<button
			on:click={handleClick}
			{disabled}
			class="bg-secondary inline-block py-3 mb-2 px-6 text-xl font-medium text-white rounded-md"
			>Submit</button
		>
		{#await promise}
			<p>...Submitting form</p>
		{:catch error}
			<p class="text-sm text-error">{error}</p>
		{/await}
	</div>
</div>

<!-- firstName: string;
initials: string;
familyName: string;
orcidId: string;
noOrcidId: boolean;
email: string;
institutionName: string;
institutionCountry: string;
ror: string;
noRor: boolean;
datasetTitle: string;
datasetAbstract: string;
yearPublished: string;
accessPolicy: string;
embargoEndDate: string;
authors: Array<ListAuthor>;
funders: Array<Funder>;
resources: Array<Resource>; -->
