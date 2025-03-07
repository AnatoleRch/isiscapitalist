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

  updateGainVitesse(product, palier) {
    if (palier.typeratio === "vitesse") {
        product.vitesse = product.vitesse / palier.ratio
    }
    if (palier.typeratio === "gain") {
        product.revenu = product.revenu * palier.ratio
    }
  }

  checkPalier(product) {
    let nb = product.paliers;
    for (let i = 0; i < nb; i = i + 1) {
        if (product.quantite >= product.paliers[i].seuil && product.paliers[i].unlocked == false) {
            product.paliers[i].unlocked = true
            this.updateGainVitesse(product, product.paliers[i])
            console.log(product.palier.name);
        }
    }
}


  updateProduct(product: Product, elapsedTime: number, world: World) {
    
    if (product.quantite > 0) {
        if (!product.managerUnlocked) {
            if (product.timeleft > 0) {
                product.timeleft = Math.max(0, product.timeleft - elapsedTime);
                if (product.timeleft === 0) {
                    world.money += product.revenu * product.quantite;
                    world.score += product.revenu * product.quantite;
                }
            }
        } else {
            const productionCycles = Math.floor(elapsedTime / product.vitesse);
            if (productionCycles > 0) {
                world.money += productionCycles * product.revenu * product.quantite;
                world.score += productionCycles * product.revenu * product.quantite;
            }
            product.timeleft = elapsedTime % product.vitesse; // Reste du temps
        }
    }
    
}


updateWorld(world: World) {
  const currentTime = Date.now();
  const elapsedTime = currentTime - world.lastupdate;

  world.lastupdate = currentTime; // Mettre à jour ici pour éviter un problème de timing

  world.products.forEach(product => {
      this.updateProduct(product, elapsedTime, world);
  });

  console.log(elapsedTime)
}


}