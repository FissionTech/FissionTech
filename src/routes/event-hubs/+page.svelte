<script lang="ts">
    import "carbon-components-svelte/css/g90.css";

    import MonacoEditor from "$lib/MonacoEditor.svelte";
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
        Switch,
        Tabs, TabContent, Tab, ContentSwitcher
    } from "carbon-components-svelte";
    import Settings from "$lib/Settings.svelte";

    let monacoEditor: MonacoEditor;

    async function handleLogsUpdated(event: any) {
        
        let message = event.detail.message;

        monacoEditor.stringBuilder.appendLine(message);
        monacoEditor.update();
    }

    let isSideNavOpen: boolean = false;
    
</script>

<Content>
    <div id="control-panel">
        <Grid>
            <Row>
                <Column>
                    <Settings on:logsUpdated={handleLogsUpdated} />
                </Column>
                <Column>
                    <MonacoEditor bind:this={monacoEditor}/>
                </Column>
            </Row>
        </Grid>
    </div>
</Content>

<style>
</style>