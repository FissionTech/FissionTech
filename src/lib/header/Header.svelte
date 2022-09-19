<script>
	import { page } from '$app/stores';

	import logo from './MJLLogoWIP.svg';
</script>

<header>
	<div class="corner">
		<a href="https://http://127.0.0.1:5173/">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav data-sveltekit-prefetch>
		<ul>
			<li class:active={$page.url.pathname === '/'}>
				<a href="/">Home</a>
			</li>
			<li class:active={$page.url.pathname === '/about'}>
				<a href="/about">About</a>
			</li>
			<li class:active={$page.url.pathname === '/todos'}>
				<a href="/todos">Todos</a>
			</li>
		</ul>
	</nav>

	<!-- <div class="corner">

	</div> -->
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 1rem;
		margin: 0 auto;
		max-width: 1024px;
	}

	.corner {
		max-width: 6em;
		max-height: 6em;
		flex: 1;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.corner img {
		width: 6em;
		height: 3em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: right;
		flex: 1;
		/* --background: rgba(255, 255, 255, 0.7); */
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-fg-color);
	}

	nav a {
		font-family: var(--font-header);
		color: var(--primary-fg-color);
		font-weight: 700;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.25em;
		text-decoration: none;

		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-fg-color);
	}
</style>
