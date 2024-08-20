<script>
	import { routes } from '../../../../routes';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
				<li><a href={routes['dodaj-przepis']._get()}>Dodaj przepis</a></li>
				<li><a href={routes.przepisy._get()}>Twoje przepisy</a></li>
				<li><a href={routes['dodaj-liste-zakupow']._get()}>Stwórz listę zakupów</a></li>
				<li><a href={routes['listy-zakupow']._get()}>Stwórz listę zakupów</a></li>
			</ul>
		</div>
		<h1 class="text-xl">Przepisownia</h1>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href={routes['dodaj-przepis']._get()}>Dodaj przepis</a></li>
			<li><a href={routes.przepisy._get()}>Twoje przepisy</a></li>
			<li><a href={routes['dodaj-liste-zakupow']._get()}>Stwórz listę zakupów</a></li>
			<li><a href={routes['listy-zakupow']._get()}>Twoje listy zakupów</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</button>
	</div>
</div>
