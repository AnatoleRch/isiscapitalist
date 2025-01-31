import { RatioType } from "./graphql";
export declare const origworld: {
    name: string;
    logo: string;
    money: number;
    score: number;
    totalangels: number;
    activeangels: number;
    angelbonus: number;
    lastupdate: number;
    products: {
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
        paliers: {
            name: string;
            logo: string;
            seuil: number;
            idcible: number;
            ratio: number;
            typeratio: RatioType;
            unlocked: boolean;
        }[];
    }[];
};
