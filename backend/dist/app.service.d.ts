import { World } from './graphql';
export declare class AppService {
    readUserWorld(user: string): World;
    saveWorld(user: string, world: World): void;
}
