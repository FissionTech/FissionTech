<script lang="ts">
    
	import "carbon-components-svelte/css/g90.css";
	import {page} from '$app/stores';

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
		Content
	} from "carbon-components-svelte";

    let isSideNavOpen: boolean = false;
    
</script>

<Header company="Michael Lindsay" platformName="Utilities" 
    persistentHamburgerMenu={true}
    bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink text="Home" href="/" isSelected={$page.url.pathname == '/'}/>
        <SideNavLink text="Event Hubs" href="/event-hubs" isSelected={$page.url.pathname == '/event-hubs'}/>
    </SideNavItems>
</SideNav>

<slot>

</slot>