<script lang="ts">
	import type { LatLngExpression } from 'leaflet';

	const initialView: LatLngExpression = [51.514244, 7.468429]; // Dortmund, Germany
	const markerLocations: Array<LatLngExpression> = [
		[51.513870009926, 7.473969975241] // ShipBit Office
	];
</script>

<div class="w-full h-screen">
	<!--	<Leaflet view={initialView} zoom={14}>-->
	<!--		{#each markerLocations as latLng}-->
	<!--			<Marker {latLng} width={40} height={40}>-->
	<!--				<img src="/map-marker.svg" alt="Map marker" class="h-10 w-10" />-->
	<!--				<Popup>Like & Subscribe!</Popup>-->
	<!--			</Marker>-->
	<!--		{/each}-->
	<!--	</Leaflet>-->
	<a href="/general-information">Start</a>
</div>
