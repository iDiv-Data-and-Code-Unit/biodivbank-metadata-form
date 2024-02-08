<script lang="ts">
	import maplibre, {
		Map,
		NavigationControl,
		GeolocateControl,
		ScaleControl,
		AttributionControl,
		MapLibreGL
	} from 'maplibre-gl';
	import { map } from '$lib/stores/map';
	import layers from 'protomaps-themes-base';
	import * as pmtiles from 'pmtiles';
	import { TerraDraw, TerraDrawMapLibreGLAdapter, TerraDrawRectangleMode } from 'terra-draw';

	let protocol = new pmtiles.Protocol();
	maplibre.addProtocol('pmtiles', protocol.tile);

	let mapContainer: HTMLDivElement;
	const TILE_URL = 'https://muckrock-tiles.s3.amazonaws.com/planet/20240103.pmtiles';

	const init = () => {
		return new Promise<boolean>(() => {
			const _map = new Map({
				container: mapContainer,
				style: {
					version: 8,
					glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
					sources: {
						protomaps: {
							type: 'vector',
							url: 'pmtiles://' + TILE_URL,
							attribution:
								'<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
						}
					},
					layers: layers('protomaps', 'grayscale')
				},
				center: [-101.56660156843634, 39.27531259430637],
				zoom: 4,
				hash: true
			});
			_map.addControl(new NavigationControl({}), 'top-right');
			_map.addControl(
				new GeolocateControl({
					positionOptions: { enableHighAccuracy: true },
					trackUserLocation: true
				}),
				'top-right'
			);
			_map.addControl(new ScaleControl({ maxWidth: 80, unit: 'metric' }), 'bottom-left');
			_map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

			map.set(_map);

			const draw = new TerraDraw({
				// Using the MapLibre Adapter
				adapter: new TerraDrawMapLibreGLAdapter({ map: _map }),

				// Add the Rectangle Mode
				modes: [new TerraDrawRectangleMode()]
			});

			draw.start();
			draw.setMode('rectangle');
		});
	};

	$: if (mapContainer) {
		init();
	}
</script>

<div class="map" bind:this={mapContainer} />

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';

	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
	}
</style>
