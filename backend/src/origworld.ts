import { RatioType } from "./graphql";

export const origworld = {
    name: 'A Nice World 2',
    logo: 'icones/ecolo.png',
    money: 0,
    score: 0,
    totalangels: 0,
    activeangels: 0,
    angelbonus: 2,
    lastupdate: 0,
    products: [
        {
            id: 1,
            name: 'Des bonbons !!',
            logo: 'icones/bonbon.png',
            cout: 3,
            croissance: 1.03,
            revenu: 1,
            vitesse: 500,
            quantite: 1,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Une poignée de bonbons !',
                    logo: 'icones/bonbon.png',
                    seuil: 10,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Une sac de bonbons !!",
                    logo: 'icones/bonbon.png',
                    seuil: 100,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Une montagne de bonbons !!!",
                    logo: 'icones/bonbon.png',
                    seuil: 1000,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
            ],
        },
        {
            id: 2,
            name: 'Des cookies !!',
            logo: 'icones/cookie.png',
            cout: 5,
            croissance: 1.07,
            revenu: 3,
            vitesse: 1000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Une assiete de cookies !',
                    logo: 'icones/cookie.png',
                    seuil: 10,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Une tonne de cookies !!",
                    logo: 'icones/cookie.png',
                    seuil: 100,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Une montagne de cookies !!!",
                    logo: 'icones/cookie.png',
                    seuil: 1000,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
            ],
        },
        {
            id: 3,
            name: 'Une barbe à papa !!',
            logo: 'icones/barbapapa.png',
            cout: 8,
            croissance: 1.12,
            revenu: 5,
            vitesse: 1750,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Comme un petit nuage !',
                    logo: 'icones/barbapapa.png',
                    seuil: 10,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Un gros nuage de barbapapa !!",
                    logo: 'icones/barbapapa.png',
                    seuil: 100,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Une piscine de barbapapa !!!",
                    logo: 'icones/barbapapa.png',
                    seuil: 1000,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
            ],
        },
        {
            id: 4,
            name: 'Une Glaces !!',
            logo: 'icones/glace.png',
            cout: 15,
            croissance: 1.12,
            revenu: 8,
            vitesse: 2500,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Plein de glaces !',
                    logo: 'icones/glace.png',
                    seuil: 10,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "De quoi faire un bonhomme de neige !!",
                    logo: 'icones/glace.png',
                    seuil: 100,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "On peut faire un igloo !!!",
                    logo: 'icones/glace.png',
                    seuil: 1000,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
            ],
        },
        {
            id: 5,
            name: 'Un Panckake !!',
            logo: 'icones/panckake.png',
            cout: 25,
            croissance: 1.08,
            revenu: 13,
            vitesse: 5000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Une pile de panckakes !',
                    logo: 'icones/panckake.png',
                    seuil: 10,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Une tour de panckakes !!",
                    logo: 'icones/panckake.png',
                    seuil: 100,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "Un gratte-ciel fait de panckakes !!!",
                    logo: 'icones/panckake.png',
                    seuil: 1000,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
            ],
        },
        {
            id: 6,
            name: 'Un Paris-Brest !!',
            logo: 'icones/Paris-Brest.png',
            cout: 35,
            croissance: 1.05,
            revenu: 20,
            vitesse: 10000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: '10 Paris-Brest',
                    logo: 'icones/Paris-Brest.png',
                    seuil: 10,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "100 Paris-Brest !!",
                    logo: 'icones/Paris-Brest.png',
                    seuil: 100,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
                {
                    name: "1000 Paris-Brest !!!",
                    logo: 'icones/Paris-Brest.png',
                    seuil: 1000,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false,
                },
            ],
        },
    ],
    allunlocks: [
        {
            name: 'All is better than one',
            logo: 'icones/all.jpg',
            seuil: 30,
            idcible: 0,
            ratio: 2,
            typeratio: RatioType.gain,
            unlocked: false,
        },
        {
            name: 'To take and not to give',
            logo: 'icones/all.jpg',
            seuil: 150,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false,
        }
    ],
    upgrades: [
        {
            name: 'Do you like paper bag ?',
            logo: 'icones/sacpapier.jpg',
            seuil: 1000,
            idcible: 1,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false,
        },
        {
            name: 'This is my bin',
            logo: 'icones/recyclage.jpg',
            seuil: 15000,
            idcible: 2,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false,
        },
    ],
    angelupgrades: [
        {
            name: 'Angel Sacrifice',
            logo: 'icones/angel.png',
            seuil: 10,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false,
        },
        {
            name: 'Angelic Mutiny',
            logo: 'icones/angel.png',
            seuil: 100000,
            idcible: -1,
            ratio: 2,
            typeratio: RatioType.ange,
            unlocked: false,
        },
    ],
    managers: [
        {
            name: 'Wangari Maathai',
            logo: 'icones/WangariMaathai.jpg',
            seuil: 10,
            idcible: 1,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false,
        },
        {
            name: 'Ellen MacArthur',
            logo: 'icones/ellenmacarthur.jpg',
            seuil: 15000,
            idcible: 2,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false,
        }
    ],
};
