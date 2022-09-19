<script lang="ts">
	import BlogPost from '$lib/BlogPost.svelte';
	import type PageData from '$types';

	export let data: PageData;
	$: posts = data.posts;

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#each posts as post (post.id)}
		<BlogPost
			isPreview={true}
			title={post.attributes.Title}
			author="Michael Lindsay"
			datetime="2022-09-17T00:00:00"
			body={post.attributes.Body}
			cover=""
			shortDescription={post.attributes.ShortDescription}
		/>
	{/each}
</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
