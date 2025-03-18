import { Palier, Product, World } from "./world"
import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import {
  ACHETER_ANGEL_UPGRADE,
  ACHETER_CASH_UPGRADE,
  ACHETER_PRODUIT,
  ENGAGER_MANAGER,
  GET_WORLD,
  LANCER_PRODUCTION,
  RESET_MONDE
} from './Grapqhrequests'
@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  server = 'http://localhost:3000';
  //server = 'https://isiscapitalist.chl.connected-health.fr';
  user = 'toto';
  createClient() {
    return new Client({ url: this.server + "/graphql", exchanges: [fetchExchange] });
  }
  getWorld(user: string) {
    return this.createClient().query(GET_WORLD, { "user": user}).toPromise();
  }
  lancerProduction(product: Product) {
    return this.createClient().mutation(LANCER_PRODUCTION, { id:
   product.id}).toPromise();
   }
   async engagerManager(user: string, manager: Palier) {
    return await this.createClient().mutation(ENGAGER_MANAGER, {
      user: user,
      name: manager.name
    }).toPromise();
  }

  async acheterQtProduit(user: string, product: Product, quantite: number) {
    return await this.createClient().mutation(ACHETER_PRODUIT, {
      user: user,
      id: product.id,
      quantite: quantite
    }).toPromise();
  }

  async acheterCashUpgrade(user: string, upgrade: Palier) {
    console.log(upgrade.name);
    return await this.createClient().mutation(ACHETER_CASH_UPGRADE, {
      user,
      name: upgrade.name
    }).toPromise();
  }

  async acheterAngelUpgrade(user: string, upgrade: Palier) {
    return await this.createClient().mutation(ACHETER_ANGEL_UPGRADE, {
      user,
      name: upgrade.name
    }).toPromise();
  }

  async resetWorld(user: string) {
    return await this.createClient().mutation(RESET_MONDE, {
      user
    }).toPromise();
  }
}

