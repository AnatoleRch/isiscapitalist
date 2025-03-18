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
            world.money += product.revenu * product.quantite*(1+world.activeangels*world.angelbonus/100); // Ajouter le revenu
            world.score += product.revenu * product.quantite*(1+world.activeangels*world.angelbonus/100);
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
          world.score += productionCycles * product.revenu * product.quantite;
        }
        // Update timeleft for the next production cycle
        product.timeleft = elapsedTime % product.vitesse;
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

  checkPalier(product) {
    for (let i = 0; i < product.paliers.length; i++) {
        const palier = product.paliers[i];
        if (product.quantite >= palier.seuil && !palier.unlocked) {
            palier.unlocked = true;
            this.updateGainVitesse(product, palier);
            console.log(`Bonus appliqué : ${palier.name}`);
        }
    }
}

checkAllUnlocks(world: World) {
  world.allunlocks.forEach((unlock) => {
      if (!unlock.unlocked) {
          const isUnlocked = world.products.every(
              (product) => product.quantite >= unlock.seuil
          );

          if (isUnlocked) {
              unlock.unlocked = true;
              
              // Appliquer le bonus à tous les produits
              world.products.forEach((product) => {
                  this.updateGainVitesse(product, unlock);
              });

              console.log(`AllUnlock débloqué : ${unlock.name}`);
          }
      }
  });
}

  updateGainVitesse(product: Product, palier) {
    if (palier.typeratio === "vitesse") {
        product.vitesse = product.vitesse / palier.ratio;
    }
    if (palier.typeratio === "gain") {
        product.revenu = product.revenu * palier.ratio;
    }
    console.log(`Palier atteint : ${palier.name}`);
}


updateUpgrade(world, palier, type: 'money' | 'angels') {
  if (palier.unlocked) {
      console.log(`${palier.name} est déjà débloqué.`);
      return { success: false, message: `${palier.name} est déjà débloqué.` };
  }

  const resource = type === 'money' ? world.money : world.activeangels;
  const resourceName = type === 'money' ? 'argent' : 'anges';

  if (resource < palier.seuil) {
      throw new Error(`Fonds insuffisants pour acheter ${palier.name} avec ${resourceName}.`);
  }

  // Déduire les ressources
  if (type === 'money') {
      world.money -= palier.seuil;
  } else {
      world.activeangels -= palier.seuil;
  }

  palier.unlocked = true;

  // Appliquer le bonus
  world.products.forEach(product => {
      const shouldApply = type === 'angels' || palier.idcible === 0 || palier.idcible === product.id;

      if (shouldApply) {
          if (palier.typeratio === 'gain') {
              product.revenu *= palier.ratio;
          } else if (palier.typeratio === 'vitesse') {
              product.vitesse /= palier.ratio;
          }
      }
  });

  console.log(`${palier.name} débloqué et bonus appliqué !`);
  return { success: true, message: `${palier.name} débloqué et bonus appliqué !` };
}

worldReset(user: string): World {
  let world = this.readUserWorld(user);
  this.updateWorld(world);

  const additionalAngels = Math.floor(150 * Math.sqrt(world.score / Math.pow(10, 4))) - world.totalangels;
  world.totalangels += additionalAngels;
  world.activeangels += additionalAngels;

  const score = world.score;
  const totalangels = world.totalangels;
  const activeangels = world.activeangels;
  const name = world.name;

  // Reset world to its initial state
  world = <World>origworld;
  world.name = name;
  world.score = score;
  world.totalangels = totalangels;
  world.activeangels = activeangels;
  this.saveWorld(user, world);

  return world;
}
}