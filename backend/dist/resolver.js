"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQlResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const app_service_1 = require("./app.service");
let GraphQlResolver = class GraphQlResolver {
    constructor(service) {
        this.service = service;
    }
    async getWorld(user) {
        const world = this.service.readUserWorld(user);
        this.service.updateWorld(world);
        this.service.saveWorld(user, world);
        return world;
    }
    async acheterQtProduit(user, id, quantite) {
        const world = await this.service.readUserWorld(user);
        const bought_product = world.products.find(p => p.id === id);
        if (!bought_product)
            throw new Error(`Produit avec l'ID ${id} introuvable`);
        const totalCost = bought_product.cout * ((1 - Math.pow(bought_product.croissance, quantite)) / (1 - bought_product.croissance));
        if (world.money < totalCost)
            throw new Error("Fonds insuffisants pour l'achat");
        world.money -= totalCost;
        bought_product.quantite += quantite;
        bought_product.cout *= Math.pow(bought_product.croissance, quantite);
        this.service.saveWorld(user, world);
    }
    async lancerProductionProduit(user, id) {
        const world = await this.service.readUserWorld(user);
        const item = world.products.find(p => p.id === id);
        if (!item)
            throw new Error(`produit ID= ${id} introuvable`);
        if (item.timeleft > 0)
            throw new Error(`produit ${item.name} déja en production`);
        item.timeleft = item.vitesse;
        await this.service.saveWorld(user, world);
        return item;
    }
    async engagerManager(user, managerName) {
        const world = await this.service.readUserWorld(user);
        const manager = world.managers.find(m => m.name === managerName);
        if (!manager)
            throw new Error(`Manager with name ${managerName} not found`);
        if (manager.unlocked)
            throw new Error(`Manager ${managerName} is already unlocked`);
        const product = world.products.find(p => p.id === manager.idcible);
        if (!product)
            throw new Error(`Product with ID ${manager.idcible} not found`);
        manager.unlocked = true;
        product.managerUnlocked = true;
        await this.service.saveWorld(user, world);
        return manager;
    }
};
exports.GraphQlResolver = GraphQlResolver;
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphQlResolver.prototype, "getWorld", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('user')),
    __param(1, (0, graphql_1.Args)('id')),
    __param(2, (0, graphql_1.Args)('quantite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], GraphQlResolver.prototype, "acheterQtProduit", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('user')),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], GraphQlResolver.prototype, "lancerProductionProduit", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('user')),
    __param(1, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GraphQlResolver.prototype, "engagerManager", null);
exports.GraphQlResolver = GraphQlResolver = __decorate([
    (0, graphql_1.Resolver)('World'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], GraphQlResolver);
//# sourceMappingURL=resolver.js.map