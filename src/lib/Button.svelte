<script lang="ts">
    export let Url: string;
    export let Text: string;
    export let Primary: boolean = false;
</script>

<a class="{Primary ? 'primary' : ''}" href={Url}>{Text}</a>

<style>
    a {
        border-width: 8px;
        border: solid var(--accent-fg-color);
        background-color: var(--primary-bg-color);
        color: var(--accent-fg-color);
        font-size: 2.2em;
        font-weight: 900;
        padding: .45em .75em;
        border-radius: 8px;
        text-transform: uppercase;
        text-align: center;
    }

    a:hover {
        background-color: var(--accent-fg-color);
        color: var(--primary-bg-color);
        text-decoration: none;
        transition: all 0.24s;
    }

    a.primary {
        background-color: var(--accent-fg-color);
        color: var(--primary-bg-color);
    }

    a.primary:hover {
        background-color: var(--primary-bg-color);
        color: var(--accent-fg-color);
        transition: all 0.2s;
    }
</style>