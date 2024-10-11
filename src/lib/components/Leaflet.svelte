<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import geoJson from '$lib/geo.json';
	import * as topojson from 'topojson-client';
	import { geoStore } from '$lib/stores/geo';
	import { datasetOverview } from '$lib/stores/datasetOverview';

	let map: L.Map | undefined;
	let mapElement: HTMLDivElement;

	let geoJsonData: any;

	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;

	// @ts-ignore
	L.TopoJSON = L.GeoJSON.extend({
		addData: function (data: any) {
			var geojson, key;
			if (data.type === 'Topology') {
				for (key in data.objects) {
					if (data.objects.hasOwnProperty(key)) {
						geojson = topojson.feature(data, data.objects[key]);
						L.GeoJSON.prototype.addData.call(this, geojson);
					}
				}
				return this;
			}
			L.GeoJSON.prototype.addData.call(this, data);
			return this;
		}
	});

	// @ts-ignore
	L.topoJson = function (data: any, options: any) {
		// @ts-ignore
		return new L.TopoJSON(data, options);
	};

	function initializeMap() {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom');
		}
		map = L.map(mapElement, {
			maxBounds: [
				[-90, -180],
				[90, 180]
			],
			minZoom: 3,
			maxZoom: 6
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		// @ts-ignore
		geoJsonData = L.topoJson(null, {
			style: function (feature: any) {
				return {
					color: '#000',
					opacity: 1,
					weight: 1,
					fillColor:
						feature.properties['regiontype'] === 'ADM'
							? $datasetOverview.geographicScope.countries.includes(feature.properties['title_EN'])
								? '#0f9d38'
								: '#B4F8C8'
							: $datasetOverview.geographicScope.marineRegions.includes(feature.properties['title_EN'])
							? '#289f9c'
							: '#A0E7E5',
					fillOpacity:
						$datasetOverview.geographicScope.countries.includes(feature.properties['title_EN']) ||
						$datasetOverview.geographicScope.marineRegions.includes(feature.properties['title_EN'])
							? 0.5
							: 0.2
				};
			},
			onEachFeature: function (feature: any, layer: any) {
				if (feature.properties.regiontype === 'ADM') {
					$geoStore.countries = Array.from(
						new Set([...$geoStore.countries, feature.properties['title_EN']])
					).sort();
				} else {
					$geoStore.marineRegions = Array.from(
						new Set([...$geoStore.marineRegions, feature.properties['title_EN']])
					).sort();
				}
				// layer.on({
				// 	mouseover: (e) =>
				// 		e.target.setStyle({
				// 			color: '#00f'
				// 		}),
				// 	mouseout: (e) =>
				// 		e.target.setStyle({
				// 			color: '#000'
				// 		})
				// });
				// layer.bindPopup('<p>' + feature.properties['title_EN'] + '</p>');
			}
		}).addTo(map);

		$geoStore.layer = geoJsonData;

		geoJsonData.on('click', (e: any) => {
			const region: string = e.layer.feature.properties['title_EN'];
			const regionType: string = e.layer.feature.properties['regiontype'];
			if (regionType === 'ADM') {
				if ($datasetOverview.geographicScope.countries.includes(region)) {
					$datasetOverview.geographicScope.countries = $datasetOverview.geographicScope.countries.filter(
						(country: string) => country !== region
					);
					e.layer.setStyle({
						fillColor: '#B4F8C8',
						fillOpacity: 0.2
					});
				} else {
					$datasetOverview.geographicScope.countries = [...$datasetOverview.geographicScope.countries, region];
					e.layer.setStyle({
						fillColor: '#0f9d38',
						fillOpacity: 0.5
					});
				}
			} else {
				if ($datasetOverview.geographicScope.marineRegions.includes(region)) {
					$datasetOverview.geographicScope.marineRegions = $datasetOverview.geographicScope.marineRegions.filter(
						(country: string) => country !== region
					);
					e.layer.setStyle({
						fillColor: '#A0E7E5',
						fillOpacity: 0.2
					});
				} else {
					$datasetOverview.geographicScope.marineRegions = [...$datasetOverview.geographicScope.marineRegions, region];
					e.layer.setStyle({
						fillColor: '#289f9c',
						fillOpacity: 0.5
					});
				}
			}
		});
		geoJsonData.addData(geoJson);
	}

	onMount(initializeMap);

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else if (view && zoom) {
			map.setView(view, zoom);
		}
	}

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});
</script>

<div class="w-full h-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
