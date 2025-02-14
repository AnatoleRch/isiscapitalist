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

@Mutation()
    async lancerProductionProduit(
        @Args('user') user: string, // User name
        @Args('id') id: number,    // Item ID
    ) {
        const world = await this.service.readUserWorld(user);

        // Find the item in the user's world
        const item = world.products.find(p => p.id === id);
        if (!item) throw new Error(`produit ID= ${id} introuvable`);

        // Check if the item is already producing
        if (item.timeleft > 0) throw new Error(`produit ${item.name} déja en production`);

        // Initialize the production timer
        item.timeleft = item.vitesse; // Set timeleft to the item's production speed

        // Save the updated world state
        await this.service.saveWorld(user, world);


        return item;

}

@Mutation()
async engagerManager(
    @Args('user') user: string, // User ID
    @Args('name') managerName: string, // Manager name
) {
    const world = await this.service.readUserWorld(user);

    // Find the manager by name
    const manager = world.managers.find(m => m.name === managerName);
    if (!manager) throw new Error(`Manager with name ${managerName} not found`);

    // Check if the manager is already unlocked
    if (manager.unlocked) throw new Error(`Manager ${managerName} is already unlocked`);

    // Find the product the manager manages
    const product = world.products.find(p => p.id === manager.idcible);
    if (!product) throw new Error(`Product with ID ${manager.idcible} not found`);

    // Unlock the manager and set the product's managerUnlocked property
    manager.unlocked = true;
    product.managerUnlocked = true;

    // Save the updated world state
    await this.service.saveWorld(user, world);

    return manager;
}


    // Helper function to handle the production timer
    // startProductionTimer(user: string, id: number, speed: number) {
    //     const interval = setInterval(async () => {
    //         const world = await this.service.readUserWorld(user);
    //         const item = world.products.find(p => p.id === id);
    //         console.log (item);

    //         if (!item || item.timeleft <= 0) {
    //             clearInterval(interval); // Stop the timer if the item is no longer producing
    //             return;
    //         }

    //         // Decrement the timeleft
    //         item.timeleft -= 100; // Adjust based on your timer resolution (e.g., 100ms)

    //         // If production is complete, add revenue to the user's money
    //         if (item.timeleft <= 0) {
    //             item.timeleft = 0; // Ensure timeleft doesn't go negative
    //             world.money += item.revenu * item.quantite; // Add revenue based on quantity
    //             console.log(`Production complete for item ${item.name}. Earned ${item.revenu * item.quantite} money.`);
    //         }

    //         // Save the updated world state
    //         await this.service.saveWorld(user, world);
    //     }, 100); // Run the timer every 100ms (adjust as needed)
    // }



}
