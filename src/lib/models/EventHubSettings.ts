import type { ProducerSettings } from "./ProducerSettings";

export class EventHubSettings  {
    connectionString: string;
    hubName: string;

    constructor(connectionString: string, hubName: string) {
        this.connectionString = connectionString;
        this.hubName = hubName;
    }

    
}