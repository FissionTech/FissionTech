<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {
        Form,
        FormGroup,
        TextInput,
        Button,
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        ToolbarMenu,
        ToolbarMenuItem,
        ToolbarBatchActions,
        Slider,
        NumberInput,
        Grid,
        Row,
        Column,
		ComposedModal,
		ModalHeader,
		ModalBody
    } from 'carbon-components-svelte';
    import {
        CheckmarkFilled,
        CheckmarkOutline,
        MisuseOutline,
        Play,
        Loop,
        StopFilledAlt
    } from 'carbon-icons-svelte';
    import { ProducerSettings } from "./models/ProducerSettings";
    import { createEventDispatcher } from 'svelte';
	import { EventHubSettings } from "./models/EventHubSettings";
    import { v4 as uuidv4 } from "uuid";

    const dispatch = createEventDispatcher();

    export let namespaceConnectionString: string = "";
    export let hubName: string = "";
    export let producers: ProducerSettings[] = [];

    let numProducers: number = 1;
    let namespaceConnectionStringInvalid: boolean;
    let hubNameInvalid: boolean;
    let partitionKeyInvalid: boolean;

    $:namespaceConnectionStringInvalid = namespaceConnectionString.length === 0;
    $:hubNameInvalid = hubName.length === 0;

    function onLogUpdated(message: string) {
        dispatch('logsUpdated', {
            message: message
        });
    }

    // Related to modal
    let isModalOpen = false;

    let defaultProducerQuantity = 50;
    let newProducerQuantity = defaultProducerQuantity;
    let newProducerFrequency = "";
    let newProducerPartitionKey = "";
    let newProducerBody = "";
    let isBodyInvalid: boolean;
    $: isBodyInvalid = newProducerBody.length === 0;

    let selectedRowIds: string[] = [];

    function openModal() {
        newProducerQuantity = defaultProducerQuantity;
        newProducerFrequency = "";
        newProducerPartitionKey = "";
        newProducerBody = "";

        isModalOpen = true;
    }

    function updateProducers() {
        producers = producers;
    }

    function onProducerStart() {
        updateProducers();
    }

    function onProducerStop() {
        updateProducers();
    }

    function onProducerComplete() {
        updateProducers();
    }

    function onProducerFail() {
        updateProducers();
    }

    function createProducer() {
        producers.push(
            new ProducerSettings(
                uuidv4(),
                newProducerBody,
                namespaceConnectionString,
                hubName,
                newProducerFrequency,
                newProducerQuantity,
                newProducerPartitionKey,
                "READY",
                onLogUpdated,
                onProducerStart,
                onProducerStop,
                onProducerComplete,
                onProducerFail
            )
        );

        producers = producers;

        isModalOpen = false;
    }

    function deleteMultipleProducers() {
        let producersToDelete = producers.filter(producer => {
            producer.id in selectedRowIds
        });

        producersToDelete.map(producer => {
            producer.state = "STOPPED"
        });

        producers = producers.filter(producer => {
            !(selectedRowIds.includes(producer.id))
        });

        selectedRowIds = [];
    }

    function startMultipleProducers() {
        for(let producer of producers) {
            console.log(`Producer Id: ${producer.id}`);
            console.log(`Selected Row IDs: ${selectedRowIds}`);
            console.log(`Is producer id selected? ${selectedRowIds.includes(producer.id)}`);
            if(selectedRowIds.includes(producer.id)) {
                producer.start();
            }
        }
    }

    function stopMultipleProducers() {
        for(let producer of producers) {
            if(selectedRowIds.includes(producer.id)) {
                producer.stop();
            }
        }
    }

    function deleteProducer() {

    }

    function startProducers() {

    }

</script>

<Form on:submit>
    <Grid>
        <Row>
            <Column>
                <FormGroup legendText="Connection Settings">
                    <TextInput
                        labelText="Namespace Connection String"
                        bind:value={namespaceConnectionString}
                        required
                        bind:invalid={namespaceConnectionStringInvalid}
                        invalidText="Must have a value."/>
            
                    <TextInput
                        labelText="Hub Name"
                        bind:value={hubName}
                        required
                        bind:invalid={hubNameInvalid}
                        invalidText="Must have a value." />
                </FormGroup>
            </Column>
        </Row>
        <Row>
            <Column>
                <DataTable
                title="Producers"
                description="The producers of events sent to Event Hub and their settings."
                batchSelection
                bind:selectedRowIds
                headers={
                    [
                        {key: "state", value: "State"},
                        {key: "quantity", value: "Quantity" },
                        {key: "frequency", value: "Frequency" },
                        {key: "partitionKey", value: "Partition Key" },
                        {key: "body", value: "Body" },
                    ]
                }
                rows={producers.map((producer) => {
                    return {
                        id: producer.id,
                        quantity: producer.quantity,
                        frequency: producer.frequency,
                        partitionKey: producer.partitionKey,
                        state: producer.state,
                        body: producer.eventBody
                    }
                })}>
                    <svelte:fragment slot="cell" let:row let:cell>
                        {#if cell.key === "state"}
                            {#if cell.value === "READY"}
                                <Play size={16} />
                            {:else if cell.value === "RUNNING"}
                                <Loop size={16} />
                            {:else if cell.value === "COMPLETED"}
                                <CheckmarkFilled size={16} />
                            {:else if cell.value === "STOPPED"}
                                <StopFilledAlt size={16} />
                            {:else if cell.value === "FAILED"}
                                <MisuseOutline size={16} />
                            {/if}
                        {:else}
                            {cell.value}
                        {/if}
                    </svelte:fragment>
                    <Toolbar>
                        <ToolbarBatchActions>
                            <Button icon={Play} on:click={startMultipleProducers}>Start</Button>
                            <Button icon={StopFilledAlt} on:click={stopMultipleProducers}>Stop</Button>
                            <Button icon={MisuseOutline} on:click={deleteMultipleProducers}>Delete</Button>
                        </ToolbarBatchActions>
                        <ToolbarContent>
                            <ToolbarSearch shouldFilterRows />
                            <ToolbarMenu>
                                <ToolbarMenuItem primaryFocus>Start All</ToolbarMenuItem>
                                <ToolbarMenuItem hasDivider>
                                    Stop All
                                </ToolbarMenuItem>
                                <ToolbarMenuItem danger>
                                    Delete All
                                </ToolbarMenuItem>
                            </ToolbarMenu>
                            <Button
                                on:click={openModal}
                                disabled={namespaceConnectionStringInvalid || hubNameInvalid}>
                                Create
                            </Button>
                        </ToolbarContent>
                    </Toolbar>
                </DataTable>
            </Column>
        </Row>
    </Grid>
</Form>

<ComposedModal bind:open={isModalOpen}>
    <ModalHeader label="Producer Settings" title = "Create a New Producer"/>
    <ModalBody hasForm>
        <FormGroup>
            <Grid fullWidth noGutter>
                <Row>
                    <Column>
                        <NumberInput id="quantity"
                            bind:value={newProducerQuantity}
                            label="Quantity"
                            />
                    </Column>
                    <Column>
                        <TextInput id="frequency"
                            bind:value={newProducerFrequency}
                            labelText="Frequency"
                            helperText="Value must be an ncrontab expression." />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <!-- We are missing validation on this after
                            moving partitionKey to the ProducerSettings class.
                            Likely need to extract a component for ProducerSettings. -->
                        <TextInput
                            labelText="Partition Key"
                            bind:value={newProducerPartitionKey}
                            invalidText="Maximum of 255 characters."
                            />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <TextInput id="event-body"
                            bind:value={newProducerBody}
                            bind:invalid={isBodyInvalid}
                            labelText="Event Body" />
                    </Column>
                </Row>
                <Row padding>
                    <Column>
                        <Button on:click={createProducer}>Create</Button>
                    </Column>
                </Row>
            </Grid>
        </FormGroup>
    </ModalBody>
</ComposedModal>