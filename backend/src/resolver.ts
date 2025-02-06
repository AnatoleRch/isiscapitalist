import { origworld } from './origworld';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Palier, World } from './graphql';
@Resolver('World')
export class GraphQlResolver {
    constructor(private service: AppService) { }
    @Query()
    async getWorld(@Args('user') user: string) {
        const world = this.service.readUserWorld(user);
        this.service.saveWorld(user, world);
        return world;
    }
    @Mutation()
    async acheterQtProduit(
        @Args('user') user: string,
        @Args('id') id: number,
        @Args('quantite') quantite: number,
    ) {
        const world = await this.service.readUserWorld(user);
        const bought_product = world.products.find(p => p.id === id);
        if (!bought_product) throw new Error(`Produit avec l'ID ${id} introuvable`)

        const totalCost = bought_product.cout * ((1 - Math.pow(bought_product.croissance, quantite)) / (1 - bought_product.croissance));
        if (world.money < totalCost) throw new Error("Fonds insuffisants pour l'achat");
        world.money -= totalCost;
        bought_product.quantite += quantite;
        bought_product.cout *= Math.pow(bought_product.croissance, quantite);
        this.service.saveWorld(user, world);






    }
}