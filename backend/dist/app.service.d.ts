import { World, Product } from './graphql';
export declare class AppService {
    getHello(): string;
    readUserWorld(user: string): World;
    saveWorld(user: string, world: World): void;
    updateProduct(product: Product, elapsedTime: number, world: World): void;
    updateWorld(user: string): void;
}
