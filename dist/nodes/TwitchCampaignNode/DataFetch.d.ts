import { JsonObject } from 'n8n-workflow';
export declare class DataFetch {
    fetch(cookies: string): Promise<JsonObject[]>;
    private generateJson;
}
