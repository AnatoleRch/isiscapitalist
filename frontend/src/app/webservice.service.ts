import { Palier, Product, World } from "./world"
import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import {
  GET_WORLD,
  LANCER_PRODUCTION,
  ACHETER_PRODUIT
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
   async acheterQtProduit(user: string, product: Product, quantite: number) {
    return await this.createClient().mutation(ACHETER_PRODUIT, {
      user: user,
      id: product.id,
      quantite: quantite
    }).toPromise();
  }
}

