<script lang="ts">

    import SvelteMarkdown from 'svelte-markdown';

    export let isPreview: boolean;
    export let title: string;
    export let shortDescription = "";
    export let author: string;
    export let datetime: string;
    export let body: string;
    export let cover: string;

    let useAutoPreview = shortDescription.length <= 0;
    let autoPreview = body.substring(0, 280);
</script>

<article>

    <figure>
        <img src="https://via.placeholder.com/200" alt="512 by 512 pixel Placeholder"/>
        <figcaption>Example Figure</figcaption>
    </figure>

    <header>
        <h2>{title}</h2>
        <div class="byline">
            <address class="author">
                By <a rel="author" href="/author/michael-lindsay">{author}</a>
                on <time datetime="{datetime}">{datetime}</time>
            </address>
        </div>
    </header>

    <div class="body">
        {#if isPreview}
            {#if useAutoPreview}
                <p>{autoPreview}</p>
            {:else}
                <p>{shortDescription}</p>
            {/if}
            
        {:else}
            <SvelteMarkdown source={body} />
        {/if}
    </div>

    <footer>
       <ul>
        <li><a href="#">Like</a></li>
        <li><a href="#">Comment</a></li>
        <li><a href="#">Share</a></li>
       </ul> 
    </footer>
</article>

<style>
    article {
        display: grid;
        background-color: var(--secondary-bg-color);
        row-gap: 1em;
        padding: 1em;
        border-radius: 8px;

        grid-template-areas: 
            'cover_img header   header'
            'cover_img body     body'
            'cover-img footer   footer';
    }

    article > figure {
        /* grid-column: 1;
        grid-row-start: 1;
        grid-row-end: 4; */
        grid-area: cover_img;
        margin-left: 1em;
    }

    article figcaption {
        padding-top: 1em;
        text-align: center;
    }

    article > header {
        /* grid-column-start: 2;
        grid-column-end: 3;
        grid-row: 1; */
        grid-area: header;
    }

    article > header > h2 {
        font-family: 'Source Code Pro';
        color: var(--primary-fg-color);
        font-size: x-large;
        font-weight: 600;
    }

    article > div.body {
        /* grid-column-start: 2;
        grid-column-end: 3;
        grid-row: 2; */
        grid-area: body;
    }

    article > div.body :global(h2) {
        font-size: large;
    }

    article > footer {
        /* grid-column-start: 1;
        grid-column-end: 3;
        grid-row: 3; */
        grid-area: footer;
    }

    footer > ul {
        list-style: none;
        display: flex;
        justify-content: right;
    }

    footer > ul > li {
        margin-right: 1.5em;
    }

    @media (max-width: 700px) {
        article {
            grid-template-areas:
                'cover_img'
                'header'
                'body'
                'footer';
        }

        article > figure {
            margin: 1em auto auto auto;
            justify-self: center;
        }
    }
</style>