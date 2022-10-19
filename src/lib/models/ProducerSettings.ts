import { EventHubProducerClient } from "@azure/event-hubs";
import type { EventHubClientOptions } from "@azure/event-hubs";
import { CronJob } from "cron";
import { AudioConsole } from "carbon-icons-svelte";

export type ProducerState = "READY" | "RUNNING" | "COMPLETED" | "STOPPED" | "FAILED";

export interface ProducerLogger {
    (message: string): void;
}

export interface ProducerCallbackMethod {
    (): void;
}

export class ProducerSettings  {
    id = "";
    frequency = "";
    quantity = 50;
    partitionKey = "";
    eventBody = "{inc}";
    state: ProducerState = "READY";

    private client: EventHubProducerClient;

    private logger?: ProducerLogger;

    private onStart?: ProducerCallbackMethod;
    private onStop?: ProducerCallbackMethod;
    private onComplete?: ProducerCallbackMethod;
    private onFail?: ProducerCallbackMethod;

    private job?: CronJob;

    constructor(
        id: string,
        eventBody: string,
        connectionString: string,
        hubName: string,
        frequency: string = "",
        quantity: number = 50,
        partitionKey = "",
        state: ProducerState = "READY",
        logger?: ProducerLogger,
        onStart?: ProducerCallbackMethod,
        onStop?: ProducerCallbackMethod,
        onFail?: ProducerCallbackMethod,
        onComplete?: ProducerCallbackMethod,) {
            this.id = id;
            this.frequency = frequency;
            this.quantity = quantity;
            this.partitionKey = partitionKey;
            this.eventBody = eventBody;
            this.state = state;

            this.client = new EventHubProducerClient(connectionString, hubName);
            this.logger = logger;
            this.onFail = onFail;
            this.onStop = onStop;
            this.onStart = onStart;
            this.onComplete = onComplete;
        }

    
    private initializeCronJob() {
        if(this.frequency.length === 0)
            return;

        this.job = new CronJob(
            this.frequency,
            this.sendBatch,
            undefined,
            false,
            undefined,
            this
        );
    }

    private sendBatch() {
        console.log(`[${this.id}] Sending ${this.quantity} messages as batch.`);

        this.log(`[${this.id}] Sending ${this.quantity} messages as batch.`);

        const batch = this.client.createBatch({
            partitionKey: this.partitionKey
        })
        .then((batch) => {
            for(let i = 0; i < this.quantity; i++) {
                let success = batch.tryAdd({body: this.eventBody});
    
                if(!success) {
                    this.job?.stop();
    
                    this.fail();
    
                    this.log(`[${this.id}] Failed to add message batch.`);
                }
            }

            try {
                this.client.sendBatch(batch)
                .then((result) => {
                    console.log(`[${this.id}] Sent ${this.quantity} messages.`);
                    this.log(`[${this.id}] Sent ${this.quantity} messages.`);
                    
                    this.onCronComplete();
                });
            } catch {
                this.job?.stop();
    
                this.fail();
    
                this.log(`[${this.id}] Failed to send batch.`);
            }
            
        });


    }

    private onCronComplete() {
        this.log(`[${this.id}] Sent ${this.quantity} messages.`);
    }

    private log(message: string) {
        if(this.logger)
            this.logger(message);
    }

    start() {
        this.state = "RUNNING";

        if(this.onStart)
            this.onStart();

        this.initializeCronJob();

        if(this.job) {
            this.job?.start();
        }
        else {
            console.log("Sent batch as if it were a single job");

            this.sendBatch();

            // We only want to mark this as complete if our
            // state is still 'RUNNING'. Otherwise,
            // it's possible that the execution failed.
            if(this.state === "RUNNING")
                this.complete();
        }
    }

    complete() {
        this.state = "COMPLETED";

        if(this.job)
            this.job.stop();
        
        if(this.onComplete)
            this.onComplete();
    }

    stop() {
        this.state = "STOPPED";

        if(this.job)
            this.job.stop();
        
        if(this.onStop)
            this.onStop();
    }

    fail() {
        this.state = "FAILED"
        
        if(this.job)
            this.job.stop();
        
        if(this.onFail)
            this.onFail();
    }
}