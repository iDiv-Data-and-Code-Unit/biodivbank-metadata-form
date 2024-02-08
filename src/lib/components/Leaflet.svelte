<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import geoJson from '$lib/geo.json';
	import * as topojson from 'topojson-client';

	let map: L.Map | undefined;
	let mapElement: HTMLDivElement;

	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom');
		}
		map = L.map(mapElement, {
			maxBounds: [
				[-90, -180],
				[90, 180]
			],
			minZoom: 3,
			maxZoom: 4
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.TopoJSON = L.GeoJSON.extend({
			addData: function (data) {
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
		L.topoJson = function (data, options) {
			return new L.TopoJSON(data, options);
		};

		var Geojson = L.topoJson(null, {
			style: function (feature) {
				return {
					color: '#000',
					opacity: 1,
					weight: 1,
					fillColor: '#35495d',
					fillOpacity: 0.8
				};
			},
			onEachFeature: function (feature, layer) {
				layer.bindPopup('<p>' + feature.properties['title_EN'] + '</p>');
			}
		}).addTo(map);

		Geojson.addData(geoJson);
	});

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
