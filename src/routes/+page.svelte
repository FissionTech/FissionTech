<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {
        Button,
        Grid,
        Row,
        Column,
        TextArea,
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderNavMenu,
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
        SideNavLink,
        SideNavDivider,
		SkipToContent,
        Content,
        ClickableTile
    } from "carbon-components-svelte";
    
    export const prerender = true;
</script>

<Content>
    <Grid>
        <Row>
            <Column>
                <h1>Welcome!</h1>
                <br />
                <p>This is my personal website. Right now, it just has
                    a couple pages with tools I've built, but soon I'll be adding projects,
                    tutorials, and blog posts. Stay tuned!
                </p>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <h2>Pages</h2>
            </Column>
        </Row>
        <Row padding>
            <Column>
                <ClickableTile href="/event-hubs">Event Hubs Tools</ClickableTile>
            </Column>
            <Column></Column>
        </Row>
    </Grid>
</Content>

<style>

</style>