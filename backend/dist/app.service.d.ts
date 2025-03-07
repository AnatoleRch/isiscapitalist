import { World, Product } from './graphql';
export declare class AppService {
    getHello(): string;
    readUserWorld(user: string): World;
    saveWorld(user: string, world: World): void;
    updateGainVitesse(product: any, palier: any): void;
    checkPalier(product: any): void;
    updateProduct(product: Product, elapsedTime: number, world: World): void;
    updateWorld(world: World): void;
}
