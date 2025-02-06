import { AppService } from './app.service';
import { World } from './graphql';
export declare class GraphQlResolver {
    private service;
    constructor(service: AppService);
    getWorld(user: string): Promise<World>;
    acheterQtProduit(user: string, id: number, quantite: number): Promise<void>;
}
