import { AppService } from './app.service';
import { Palier, World } from './graphql';
export declare class GraphQlResolver {
    private service;
    constructor(service: AppService);
    getWorld(user: string): Promise<World>;
    acheterQtProduit(user: string, id: number, quantite: number): Promise<void>;
    lancerProductionProduit(user: string, id: number): Promise<import("./graphql").Product>;
    engagerManager(user: string, managerName: string): Promise<Palier>;
    acheterCashUpgrade(user: string, upgradeName: string): Promise<Palier>;
    acheterAngelUpgrade(user: string, upgradeName: string): Promise<Palier>;
}
