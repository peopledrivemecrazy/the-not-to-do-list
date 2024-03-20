<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main class="container">
	<slot />
</main>

<style>
	main {
		padding: 2em;
	}
</style>
