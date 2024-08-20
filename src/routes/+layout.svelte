<script>
	import Navbar from '$lib/frontend/components/navigation/Navbar.svelte';
	import '../app.css';
</script>

<div class="">
	<Navbar />
	<div class="flex flex-col justify-center items-center m-20">
		<slot />
	</div>
</div>
