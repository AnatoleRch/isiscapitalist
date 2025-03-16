import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { Palier, Product, World } from './world';
import { WebserviceService } from './webservice.service';
import { BigvaluePipe } from "./bigvalue.pipe";
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, BigvaluePipe, NgIf, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  qtmulti: string = '';
  server: string = ''
  world: World = new World();
  user: string = ''
  constructor(private service: WebserviceService) {
    this.service.getWorld(service.user).then((world) => {
      this.world = world.data.getWorld;
    });
    this.server = service.server + '/';
    this.user = service.user
  }

  ngOnInit() {
    this.qtmulti = '1'; // Initialisation à 'x1' lors du lancement du composant
  }

  onBuy(coutTot: number) {
    this.world.money -= coutTot;
  }

  onProductionDone(p: Product) {
    this.world.score += p.revenu;
    this.world.money += p.revenu;
  }

  changeQtMulti() {
    switch (this.qtmulti) {
      case '1':
        this.qtmulti = '10';
        break;
      case '10':
        this.qtmulti = '100';
        break;
      case '100':
        this.qtmulti = 'Max';
        break;
      case 'Max':
        this.qtmulti = '1';
        break;
      default:
        break;
    }
  }

  showManagers: boolean = false;
  showUnlocks: boolean = false;
  showUpgrades: boolean = false;

  interfaceUnlocks(): void {
    this.showUnlocks = !this.showUnlocks;
    this.showManagers = false;
    this.showUpgrades = false;
  }

  interfaceManager(): void {
    this.showUnlocks = false;
    this.showManagers = !this.showManagers;
    this.showUpgrades = false;  
  }

  interfaceUpgrade(): void {
    this.showUnlocks = false;
    this.showManagers = false;
    this.showUpgrades = !this.showUpgrades;  
  }

  getManager(p: Palier): Palier {
    let managers = this.world.managers;
    let manager = managers.find((m) => m.name === p.name);
    if (!manager) {
      throw new Error(`Le manager avec le nom ${p.name} n'existe pas`);
    }
    return manager;
  }

  getUpgrade(p: Palier): Palier {
    let upgrades = this.world.upgrades;
    let upgrade = upgrades.find((u) => u.name === p.name);
    if (!upgrade) {
      throw new Error(`Le manager avec le nom ${p.name} n'existe pas`);
    }
    return upgrade;
  }

  getProduitManager(pa: Palier): Product {
    let produits = this.world.products;
    let produit = produits.find((p) => p.id === pa.idcible);
    if (!produit) {
      throw new Error(`Le manager n'a pas de produit`);
    }
    return produit;
  }

  hireManager(p: Palier): Palier {
    let manager = this.getManager(p);
    console.log('manager : ' + manager.name);
    let produit = this.getProduitManager(p);
    console.log('poduit : ' + produit.name);
    produit.timeleft = produit.vitesse;
    produit.managerUnlocked = true;
    console.log('produit.managerUnlocked : ' + produit.managerUnlocked);
    manager.unlocked = true;
    console.log('manager.unlocked : ' + manager.unlocked);

    return manager;
  }

  buyUpgrade(p: Palier): Palier {
    let palier = this.getUpgrade(p);
    palier.unlocked = true;
    let id = palier.idcible;
    if (id != 0) {
      let product = this.world.products.find((p) => p.id === id);
      if (product !== undefined) { 
        this.updateGainOrVitesse(product, palier);
      }
    } else {
      for (let i = 0; i < 6; i++) {
        this.updateGainOrVitesse(this.world.products[i], palier);
      }
    }
    return palier
  }

  updateGainOrVitesse(produit :Product, palier: Palier) {
    // tous les paliers
    if (palier.typeratio === "vitesse") {
      produit.vitesse = produit.vitesse / palier.ratio
    }
    if (palier.typeratio === "gain") {
      produit.revenu = produit.revenu * palier.ratio
    }
}

  checkAllUnlocks() {
    let nb_allunlocks = this.world.allunlocks.length;
    var tableau = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < nb_allunlocks; i++) {
      tableau = [0, 0, 0, 0, 0, 0];
      if (this.world.allunlocks[i].unlocked === false) {
        for (let j = 0; j < 6; j++) {
          if (
            this.world.products[j].quantite >= this.world.allunlocks[i].seuil
          ) {
            tableau[j] = 1;
          }
        }
        if (JSON.stringify(tableau) === JSON.stringify([1, 1, 1, 1, 1, 1])) {
          this.world.allunlocks[i].unlocked = true;
          for (let k = 0; k < 6; k++) {
            console.log("on est arrive jusque la")
            this.updateGainOrVitesse(this.world.products[k], this.world.allunlocks[i]);
          }
        }
      }
    }
  }
}