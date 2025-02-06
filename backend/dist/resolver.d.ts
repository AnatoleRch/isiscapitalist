import { AppService } from './app.service';
export declare class GraphQlResolver {
    private service;
    constructor(service: AppService);
    getWorld(user: string): Promise<import("./graphql").World>;
}
