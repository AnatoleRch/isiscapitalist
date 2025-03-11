import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { World, Product } from './graphql'; // Assuming you have a Product type
import { origworld } from './origworld';

@Injectable()
export class AppService {
  getHello(): string {
    throw new Error('Method not implemented.');
  }

  readUserWorld(user: string): World {
    try {
      const data = fs.readFileSync(
        path.join(process.cwd(), 'userworlds/', user + '-world.json'),
      );
      return JSON.parse(data.toString());
    } catch (e: unknown) {
      console.log((e as Error).message);
      return origworld;
    }
    }

  saveWorld(user: string, world: World) {
    fs.writeFile(
      path.join(process.cwd(), 'userworlds/', user + '-world.json'),
      JSON.stringify(world),
      (err) => {
        if (err) {
          console.error(err);
          throw new Error(`Erreur d'écriture du monde coté serveur`);
        }
      },
    );
  }

  updateProduct(product: Product, elapsedTime: number, world: World) {
    if (product.quantite > 0) { // Vérifier que le produit est possédé
      if (!product.managerUnlocked) {
        // Produit sans manager : vérifier si timeleft > 0 et < elapsedTime
        if (product.timeleft > 0) {
          if (product.timeleft <= elapsedTime) {
            // Production is complete
            world.money += product.revenu * product.quantite; // Ajouter le revenu
            world.score += product.revenu * product.quantite;
            product.timeleft = 0; // Réinitialisation du timeleft
          } else {
            // Production is still ongoing
            product.timeleft -= elapsedTime;
          }
        }
      } else {
        // Produit avec manager : calcul du nombre de productions complètes
        const productionCycles = Math.floor(elapsedTime / product.vitesse);
        if (productionCycles > 0) {
          world.money += productionCycles * product.revenu * product.quantite;
        }
        // Update timeleft for the next production cycle
        product.timeleft = elapsedTime % product.vitesse;
        console.log(product.timeleft)
      }
    }
  }

  updateWorld(world: World) {
    const user = this;
    const currentTime = Date.now();
    const elapsedTime = currentTime - world.lastupdate; // Temps écoulé en millisecondes
    

    // Update each product individually
    world.products.forEach(product => {
      this.updateProduct(product, elapsedTime, world);
    });

    // Mise à jour du lastupdate
    world.lastupdate = currentTime;

  }
}