import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { Palier, Product, World } from './world';
import { WebserviceService } from './webservice.service';
import { BigvaluePipe } from "./bigvalue.pipe";
import { NgForOf, NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, BigvaluePipe, NgIf, NgForOf, MatSnackBarModule, MatBadgeModule, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  qtmulti: string = '';
  server: string = ''
  world: World = new World();
  user: string = ''
  badgeManagers: number = 0;
  badgeUpgrades: number = 0;
  username: any;
  constructor(private service: WebserviceService, private snackBar: MatSnackBar) {
    this.service.getWorld(service.user).then((world) => {
      this.world = world.data.getWorld;
      this.updateBadgeManagers();
    });
    this.server = service.server + '/';
    this.user = service.user
  }

  onUsernameChanged() {
    localStorage.setItem("username", this.username);
  }
  
  ngOnInit() {
    this.qtmulti = '1'; // Initialisation à 'x1' lors du lancement du composant
  }

  updateBadgeManagers() {
    this.badgeManagers = this.world.managers.filter(managers => !managers.unlocked && this.world.money >= managers.seuil).length;
    this.badgeUpgrades = this.world.upgrades.filter(upgrades => !upgrades.unlocked && this.world.money >= upgrades.seuil).length;
  }
  onBuy(event: { p: Product; prix: number; qte: number }) {
    console.log(`Achat de ${event.p} produits pour un total de ${event.prix}€`);
    this.service.lancerProduction(event.p).catch(reason =>
      console.log("erreur: " + reason)
      );
    this.world.money -= event.prix;  // Soustrait le coût total du montant du joueur
    for (const palier of event.p.paliers){
      console.log(palier)
      if (palier.unlocked==false && palier.seuil <= event.p.quantite){

        palier.unlocked=true
        this.updateGainOrVitesse(event.p, palier);
      }
    }
    // for (world.palier)
    this.updateBadgeManagers();
  }

  onProductionDone(p: Product) {
    this.world.score += p.revenu * p.quantite;
    this.world.money += p.revenu * p.quantite;
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

  hireManager(p: Palier) {
    let manager = this.getManager(p);
    if (this.world.money >= manager.seuil) {
      let produit = this.getProduitManager(p);
      produit.managerUnlocked = true;
      manager.unlocked = true;
      this.world.money = this.world.money - manager.seuil;
      this.popMessage(manager.name + " vient d'etre debloqué. La production de " + produit.name + "est désormais automatique");
    }
    this.updateBadgeManagers();
  }

  buyUpgrade(p: Palier) {
    let palier = this.getUpgrade(p);
    if (this.world.money >= palier.seuil) {
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
      this.world.money = this.world.money - palier.seuil;
    }
    this.updateBadgeManagers();
  }

  updateGainOrVitesse(produit: Product, palier: Palier) {
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

  popMessage(message: string): void {
    this.snackBar.open(message, "", { duration: 2000 })
  }
}