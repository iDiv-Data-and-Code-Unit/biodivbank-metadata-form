<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/components/Leaflet.svelte';

	const initialView: LatLngExpression = [51.514244, 7.468429];
</script>

<div class="h-screen w-screen flex items-center justify-center">
	<!-- <Map /> -->
	<Leaflet view={initialView} zoom={4} />
	<!-- <a href="/general-information">Start</a> -->
</div>
