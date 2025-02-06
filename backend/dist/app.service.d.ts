import { World } from './graphql';
export declare class AppService {
    getHello(): string;
    readUserWorld(user: string): World;
    saveWorld(user: string, world: World): void;
}
