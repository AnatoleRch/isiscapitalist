import { Palier, Product, World } from "./world"
import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import {
  GET_WORLD,
  LANCER_PRODUCTION,
  ACHETER_PRODUIT,
  ENGAGER_MANAGER,
  ACHETER_CASH_UPGRADE
} from './Grapqhrequests'
@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  server = 'http://localhost:3000';
  //server = 'https://isiscapitalist.chl.connected-health.fr';
  user: string = localStorage.getItem("username") || "defaultUser"; // Ajout d'une valeur par défaut
  
  createClient() {
    return new Client({ url: this.server + "/graphql", exchanges: [fetchExchange] });
  }
  getWorld(user: string) {
    return this.createClient().query(GET_WORLD, { "user": user}).toPromise();
  }
  async lancerProduction(product: Product) {
    return await this.createClient().mutation(LANCER_PRODUCTION, { id:
   product.id}).toPromise();
   }
  async acheterQtProduit(user: string, product: Product, quantite: number) {
    return await this.createClient().mutation(ACHETER_PRODUIT, {
      user: user,
      id: product.id,
      quantite: quantite
    }).toPromise();
  }
  async engagerManager(user: string, manager: Palier) {
    return await this.createClient().mutation(ENGAGER_MANAGER, {
      user: user,
      name: manager.name
    }).toPromise();
  }
  async acheterCashUpgrade(user: string, upgrade: Palier) {
    console.log(upgrade.name);
    return await this.createClient().mutation(ACHETER_CASH_UPGRADE, {
      user,
      name: upgrade.name
    }).toPromise();
  }
}

