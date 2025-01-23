<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	import Section from '$lib/components/formControls/Section.svelte';
	import StepTitle from '$lib/components/formControls/StepTitle.svelte';
	import PersonalInformation from '$lib/components/generalInformation/PersonalInformation.svelte';
	import Institution from '$lib/components/generalInformation/Institution.svelte';
	import DatasetMetadata from '$lib/components/generalInformation/DatasetMetadata.svelte';
	import DatasetCreators from '$lib/components/generalInformation/DatasetCreators.svelte';
	import DatasetFunders from '$lib/components/generalInformation/DatasetFunders.svelte';
	import RelatedResources from '$lib/components/generalInformation/RelatedResources.svelte';
	import CustomToast from '$lib/components/CustomToast.svelte';
	import { generalInformation } from '$lib/stores/generalInformation';
	import { localDatasetsStore } from '$lib/stores/localDatasets';
	import { step } from '$lib/stores/steps';
	import {
		datasetIdStore,
		metadataStructureIdStore,
		metadataStore
	} from '$lib/stores/datasetStore';
	import { datasetOverview } from '$lib/stores/datasetOverview';
	import { page } from '$app/stores';
	import { params } from '$lib/stores/paramsStore';
	import { samplingDesign } from '$lib/stores/samplingDesign';
	import { convertToModel } from '$lib/helper';
	import { generalInformationSchema } from '$lib/schemas/generalInformation';
	import type { LocalDataset } from '$lib/types/schema';

	const url = $page.url;

	params.update((current) => ({
		...current,
		id: url.searchParams.get('id') || '',
		auth: url.searchParams.get('auth') || ''
	}));

	// console.log(url.searchParams.get('id'));
	// console.log(url.searchParams.get('auth'));

	let loaded: boolean = false;

	onMount(() => {
		async function load() {
			let id = 1;

			datasetIdStore.set(id);

			if (localStorage) {
				const localDatasets = localStorage.getItem('localDatasets');
				const initialValue = localDatasets ? JSON.parse(localDatasets) : [];
				localDatasetsStore.set(initialValue);

				const localDataset: LocalDataset = initialValue.find((d: LocalDataset) => d.id === id);
				if (localDataset) {
					generalInformation.set(localDataset.generalInformation);
					datasetOverview.set(localDataset.datasetOverview);
					samplingDesign.set(localDataset.samplingDesign);
					metadataStructureIdStore.set(localDataset.metadataStructureId);
				}
			}

			// ATTENTION
			// if go back to this stepp currently means reload metadata from  bexis2
			// need to change	this to load from store but with a reset option from the beginning
			// or start with a other page as entry	point

			if (localStorage && $generalInformation === undefined && id) {
				try {
					metadataStructureIdStore.set(1);
					generalInformation.set({
						dataProvider: {
							firstName: 'Ibrahim',
							initials: 'I. M.',
							familyName: 'Mammadov',
							orcId: '',
							noOrcId: true,
							email: 'test@test.com',
							institutionName: 'FSU',
							institutionCountry: 'Germany',
							rorId: '',
							noRorId: true
						},
						dataset: {
							title: 'Some title here',
							abstract: 'some abstract here also',
							accessPolicy: 'Open - CC0 1.0',
							license: '',
							embargoEndDate: ''
						},
						authors: [
							{
								firstName: 'Tarak',
								initials: 'L.',
								familyName: 'Kadal',
								noOrcId: true,
								orcId: '',
								isPrimaryContact: false,
								email: '',
								institutionName: '',
								institutionCountry: '',
								rorId: '',
								noRorId: false
							}
						],
						funders: [
							{
								id: 'Naj18rJvGhFahS4GwgkCX',
								name: 'DAAD',
								noFunderId: true,
								grantNumber: 'FZT 118'
							}
						],
						resources: [
							{
								type: 'Code (statistical script, model, package, software)',
								otherType: '',
								doi: '10.25829'
							}
						]
					});
					datasetOverview.set({
						dataOrigin: {
							originalOrCompiledDataset: 'Single Source',
							currentOrLegacyDataset: ["Own or collaborator's data"],
							dataSource: { sources: ['Field experiment'], other: '' }
						},
						temporalScope: {
							start: new Date('2019-12-31T23:00:00.000Z'),
							end: new Date('2023-12-31T23:00:00.000Z')
						},
						geographicScope: {
							extent: 'National',
							countries: ['Germany'],
							marineRegions: ['North Sea'],
							fieldStation: { name: 'Something', rorId: '', noRorId: true }
						},
						realm: {
							core: ['Freshwater', 'Terrestrial'],
							transitional: ['Freshwater-Marine']
						},
						biome: {
							core: {
								freshWater: ['Rivers and Streams', 'Lakes', 'Artificial wetlands'],
								terrestrial: ['Savannas and grasslands', 'Desserts and semi-desserts'],
								marine: [],
								subterranean: []
							},
							transitional: {
								freshWaterMarine: ['Semi-confined transitional waters'],
								terrestrialFreshWater: [],
								marineTerrestrial: [],
								marineFreshWaterTerrestrial: [],
								subterraneanFreshWater: [],
								subterraneanMarine: []
							}
						},
						taxonomicScope: {
							kingdom: ['Animalia'],
							subdivision: {
								animalia: ['Macroinvertebrate'],
								fungi: [],
								plantae: [],
								chromista: [],
								protozoa: [],
								archaea: [],
								bacteria: []
							}
						}
					});
					samplingDesign.set({
						studyDesign: {
							multipleEvents: ['Multiple time points'],
							envCharacteristics: 'Largely similar'
						},
						methods: {
							inventoryProcess: {
								stageOne: ['Restricted search'],
								stageTwo: {
									restrictedSearch: ['Plot'],
									openSearch: '',
									opportunisticSearch: '',
									trapOrSample: '',
									adventitious: ''
								},
								stageThree: {
									plot: ['Permanent'],
									transect: [],
									quadrat: [],
									plotlessTechniques: []
								}
							},
							methodType: {
								stageOne: ['Capture'],
								stageTwo: {
									humanDirectObservation: [],
									machineObservation: [],
									capture: ['Net'],
									environmentalSample: { values: [], other: '' },
									physicalEvidence: { values: [], other: '' }
								},
								stageThree: {
									net: { values: ['Bongo net'], other: '' },
									trap: { values: [], other: '' },
									trawl: { values: [], other: '' },
									chemicalIntent: { values: [], other: '' },
									chemicalKnockdown: { values: [], other: '' },
									markRecapture: { values: [], other: '' },
									corer: '',
									grab: '',
									tullgrenFunnel: '',
									eDNA: ''
								}
							}
						},
						samplingScope: {
							targetedTaxa: 'Aves',
							excludedTaxa: 'raptors',
							specificCategory: {
								category: ['Growth form'],
								sex: { selected: false, targeted: '', excluded: '' },
								lifeStageAgeClass: {
									selected: false,
									targeted: '',
									excluded: ''
								},
								reproductiveCondition: {
									selected: false,
									targeted: '',
									excluded: ''
								},
								growthForm: {
									selected: true,
									targeted: 'Something',
									excluded: 'and something'
								},
								other: {
									selected: false,
									category: '',
									targeted: '',
									excluded: ''
								}
							},
							underRepresentedTaxa: [{ group: 'nocturnal Aves', reason: 'some reason' }]
						},
						samplingEffort: {
							intensity: 'Testing testing',
							effortIdentical: 'Unsure',
							description: ''
						},
						samplingLocation: {
							riverZone: { zone: ['Source Zone (crenon)'], other: '' },
							streamOrder: {
								classificationSystem: 'Strahler',
								values: ['4', '8'],
								other: ''
							},
							riverCrossSection: {
								type: ['Riparian Zone', 'Water', 'Rapids', 'Oxbow lake', 'Other area?'],
								bank: 'On Bank',
								surface: 'Below surface',
								bed: 'On subtrate',
								other: 'Other area'
							},
							vegetationLayer: { layer: ['Moss layer'], other: '' }
						},
						furtherInformation: { details: 'Description' }
					});

					console.log(
						'🚀 ~ 1:',
						$datasetIdStore,
						$metadataStructureIdStore,
						$generalInformation,
						$datasetOverview,
						$samplingDesign
					);
				} catch (error: any) {
					console.log('🚀 ~ load ~ error:', error);
					alert(error.data.ExceptionMessage);
				}
			}
			loaded = true;
		}

		load();

		step.set(1);

		return () => {
			const result = generalInformationSchema.safeParse($generalInformation);

			if (!result.success) {
				toast(CustomToast, {
					// @ts-ignore
					step: 'General information',
					// @ts-ignore
					incompleteIssues: result.error.errors,
					position: 'bottom-center',
					duration: 10000
				});
				return;
			}
		};
	});

	generalInformation.subscribe((value) => {
		if (localStorage && $datasetIdStore) {
			localDatasetsStore.update((current) => {
				if (!current) {
					return [];
				}
				const index = current.findIndex((d: LocalDataset) => d.id === $datasetIdStore);
				if (index === -1) {
					current.push({
						id: $datasetIdStore,
						metadataStructureId: $metadataStructureIdStore as number,
						generalInformation: value,
						datasetOverview: $datasetOverview,
						samplingDesign: $samplingDesign
					});
				} else {
					current[index] = {
						id: $datasetIdStore,
						metadataStructureId: $metadataStructureIdStore as number,
						generalInformation: value,
						datasetOverview: $datasetOverview,
						samplingDesign: $samplingDesign
					};
				}
				return current;
			});
		}
	});
</script>

{#if loaded}
	<StepTitle title="General information" />

	<div class="space-y-32">
		<Section
			title="Data provider"
			description={[
				'Contact details for the person uploading this dataset',
				'Please include initials for middle names, if they exist. This is important in order to disambiguate names that are otherwise similar, and ensure that individuals receive appropriate credit.'
			]}
		>
			<PersonalInformation />
			<div class="my-2 col-span-2" />
			<Institution />
		</Section>

		<Section
			title="Dataset"
			description={[
				'Information identifying the dataset',
				'Note that the short summary of a dataset is not the same as the abstract of any accompanying paper!'
			]}
		>
			<DatasetMetadata />
		</Section>

		<Section
			title="Dataset creator(s)"
			description={[
				"Enter names by dragging-and-dropping them (<img src='/handle.svg' class='h-4 w-4 text-description inline' />) into the order you would like them listed when the dataset is cited.",
				'Note that the creators of a dataset are <span class="font-medium text-black">not</span> necessarily the same as the authors of an article or report based on that dataset. This is an opportunity to give credit to those who generated the data.'
			]}
		>
			<DatasetCreators importedAuthors={null} />
		</Section>

		<Section
			title="Funding bodies"
			description="Indicate the organizations or individuals which financially supported the creation of this dataset"
		>
			<DatasetFunders />
		</Section>

		<Section
			title="Related resources"
			description="Provide the DOI (or URL) for any resources (e.g. journal articles, code, published workflows) related to this dataset. Indicate all that apply."
		>
			<RelatedResources />
		</Section>
	</div>
{/if}
