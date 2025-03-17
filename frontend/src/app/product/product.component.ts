import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Palier, Product, World } from '../world';
import { WebserviceService } from '../webservice.service';
import { MyProgressBarComponent, Orientation } from './progressbar.component'
import { BigvaluePipe } from "../bigvalue.pipe";
import { interval } from 'rxjs';

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
  progressbarvalue: number = 0
  run: boolean = false;
  auto: boolean = false;
  world: World = new World();
  _qtmulti: string = '1';
  money: number =0

  constructor(private service: WebserviceService) {
    this.service.getWorld(service.user).then((world) => {
      this.world = world.data.getWorld;
    });
    this.server = service.server + '/'
  }
  @Input()
  set cash(value: number) {
    this.money = value;
  }

  @Input()
  set prod(value: Product) {

    this.product = value;
    this.vitesse = this.product.vitesse
    this.initialValue = 0
    this.run = false
    this.auto = this.product.managerUnlocked
  }

  
  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyBuy: EventEmitter<{ p: Product; prix: number; qte: number }> = new EventEmitter();

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) this.calcMaxCanBuy();
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  startProduction() {
    if (this.product.quantite >= 1 && this.run==false) {
      this.product.timeleft = this.product.vitesse
      this.run = true
      this.sleep(this.product.vitesse).then(() => { 
        this.run = false        
        this.notifyProduction.emit(this.product)
      });
    }
  }
  Calcscore() {
    const user = this;
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.world.lastupdate; // Temps écoulé en millisecondes
    // Update each product individually
    this.world.products.forEach(product => {
      this.calcScoreproduct(product, elapsedTime, this.world);
    });

    // Mise à jour du lastupdate
    this.world.lastupdate = currentTime;

  }
  calcScoreproduct(product: Product, elapsedTime: number, world: World) {
    let elapsetime = Date.now() - this.world.lastupdate
    if (!this.product.managerUnlocked) { //Si on a pas de manager
      if (this.product.timeleft != 0) { //Si le produit est effectivement en production
        if (this.product.timeleft <= elapsetime) { // Si le produit a eu le temps d'être créé
          this.product.timeleft = 0
          this.notifyProduction.emit(this.product)
          this.run = false
          //On va informer le monde qu'il faut ajouter le revenu du produit au score du monde
        } else {
          this.product.timeleft = this.product.timeleft - elapsetime //On met a jour le temps restant
          // on met à jour la barre de progression
          this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100
        }
      }
    } else { // S'il y a un manager
      let nbObjetsCrees = Math.floor(elapsetime / this.product.vitesse)
      this.product.timeleft = this.product.vitesse - elapsetime % this.product.vitesse
      for (let i = 0; i < nbObjetsCrees; i++) {
        this.notifyProduction.emit(this.product);
      } 
    }
  }
  interval() {
    setInterval(() => { this.Calcscore(); }, 100);
  }

  getQtAchat():number {
    let qtAchat:number = 1;
    switch(this._qtmulti) {
      default:
        break;
      case '1':
        qtAchat = 1;
        this._qtmulti = qtAchat.toString()
        break;
      case '10':
        qtAchat = 10;
        this._qtmulti = qtAchat.toString()
        break;
      case '100':
        qtAchat = 100;
        this._qtmulti = qtAchat.toString()
        break;
      case 'Max':
        qtAchat = this.calcMaxCanBuy()
        this._qtmulti = qtAchat.toString()
        break;
    }
    return qtAchat
  }
  getPrixTot(qtAchat:number) :number{
          // faut la formule pour le cout tot avec croissance
    return qtAchat*this.product.cout;
  }

  calcMaxCanBuy() : number{
    let maxQuantity = Math.floor(Math.log((-this.money / this.product.cout) * (1 - this.product.croissance) + 1) / Math.log(this.product.croissance));
    return maxQuantity;
  }

  buyProduct(){
    let prixTot : number=this.getPrixTot(this.getQtAchat())
    if(this.money >= prixTot){
      this.product.quantite += this.getQtAchat()
      // nouveau cout
      this.product.cout = this.product.cout * Math.pow(this.product.croissance, this.getQtAchat())
      this.notifyBuy.emit({p: this.product, prix: prixTot, qte : this.getQtAchat()});
      
    }
  }

  

  

}

