import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Palier, Product } from '../world';
import { WebserviceService } from '../webservice.service';
import { MyProgressBarComponent, Orientation } from './progressbar.component'
import { BigvaluePipe } from "../bigvalue.pipe";

@Component({
  selector: 'app-product',
  imports: [MyProgressBarComponent, BigvaluePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  
  protected server: string;
  product: Product = new Product();
  orientation: Orientation = Orientation.horizontal;
  vitesse: number = 0;
  initialValue: number = 0;
  run: boolean = false;
  auto: boolean = false;
  constructor(private service: WebserviceService) {
    this.server = service.server + '/'
  }

  @Input()
  set prod(value: Product) {

    this.product = value;
    this.vitesse = this.product.vitesse
    this.initialValue = 0
    this.run = false
    this.auto = this.product.managerUnlocked
  }
  
  money: number =0;
  @Input()
  set cash(value: number) {
    this.money = value;
  }
  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyBuy: EventEmitter<number> = new EventEmitter<number>();

  _qtmulti: string = '1';
  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    
  }

  progressbarvalue: number = 0
  setProgress(value: number) {
    if (value >= 0 && value <= 100) {
      this.progressbarvalue = value;
    } else if (value < 0) {
      this.progressbarvalue = 0;
    } else {
      this.progressbarvalue = 100;
    }
  }
  sleep(ms :number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  startProduction() {
    this.product.timeleft = this.product.vitesse
    this.run = true
    this.sleep(this.product.vitesse).then(() => { this.run = false });
  }
  
  checkPalier(p: Product) {
    let nb = p.paliers.length;
    for (let i = 0; i < nb; i = i + 1) {
      if (p.quantite >= p.paliers[i].seuil && p.paliers[i].unlocked == false) {
        p.paliers[i].unlocked = true;
        this.updateGainVitesse(this.product, this.product.paliers[i])
      }
    }
  }

  updateGainVitesse(produit :Product, palier: Palier) {
    // tous les palliers
    if (palier.typeratio === "vitesse") {
      produit.vitesse = produit.vitesse / palier.ratio
    }
    if (palier.typeratio === "gain") {
      produit.revenu = produit.revenu * palier.ratio
    }
}
}

