export declare enum RatioType {
    gain = "gain",
    vitesse = "vitesse",
    ange = "ange"
}
export declare class Palier {
    name: string;
    logo: string;
    seuil: number;
    idcible: number;
    ratio: number;
    typeratio: RatioType;
    unlocked: boolean;
}
export declare class Product {
    id: number;
    name: string;
    logo: string;
    cout: number;
    croissance: number;
    revenu: number;
    vitesse: number;
    quantite: number;
    timeleft: number;
    managerUnlocked: boolean;
    paliers: Palier[];
}
export declare class World {
    name: string;
    logo: string;
    money: number;
    score: number;
    totalangels: number;
    activeangels: number;
    angelbonus: number;
    lastupdate: number;
    products: Product[];
    allunlocks: Palier[];
    upgrades: Palier[];
    angelupgrades: Palier[];
    managers: Palier[];
}
export declare abstract class IQuery {
    abstract getWorld(user: string): Nullable<World> | Promise<Nullable<World>>;
}
export declare abstract class IMutation {
    abstract acheterQtProduit(user: string, id: number, quantite: number): Nullable<Product> | Promise<Nullable<Product>>;
    abstract lancerProductionProduit(user: string, id: number): Nullable<Product> | Promise<Nullable<Product>>;
    abstract engagerManager(user: string, name: string): Nullable<Palier> | Promise<Nullable<Palier>>;
    abstract acheterCashUpgrade(user: string, name: string): Nullable<Palier> | Promise<Nullable<Palier>>;
    abstract acheterAngelUpgrade(user: string, name: string): Nullable<Palier> | Promise<Nullable<Palier>>;
    abstract resetWorld(user: string): Nullable<World> | Promise<Nullable<World>>;
}
type Nullable<T> = T | null;
export {};
