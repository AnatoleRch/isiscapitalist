import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Palier, Product, World } from '../world';
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
  world: World = new World();
  _qtmulti: string = '1';
  qtAchat : number = 0;
  revenuInit: number = 0;

  constructor(private service: WebserviceService) {
    this.service.getWorld(service.user).then((world) => {
      this.world = world.data.getWorld;
    });
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

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyBuy: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) this.calcMaxCanBuy();
  }

  progressbarvalue: number = 0
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

  getQtAchat() {
    switch(this._qtmulti) {
      default:
        break;
      case '1':
        this.qtAchat = 1;
        this._qtmulti = this.qtAchat.toString()
        break;
      case '10':
        this.qtAchat = 10;
        this._qtmulti = this.qtAchat.toString()
        break;
      case '100':
        this.qtAchat = 100;
        this._qtmulti = this.qtAchat.toString()
        break;
      case 'Max':
        this.qtAchat = this.calcMaxCanBuy()
        console.log(this.qtAchat)
        this._qtmulti = this.qtAchat.toString()
        break;
    }
  }

  calcMaxCanBuy() {
    const maxQuantity = Math.floor(Math.log((-this.world.money / this.product.cout) * (1 - this.product.croissance) + 1) / Math.log(this.product.croissance));
    return maxQuantity;
  }

  BuyProduct(){
    this.getQtAchat()
    if(this.product.quantite == 1){
      this.revenuInit = this.product.revenu
    }
    if(this.world.money >= this.qtAchat * this.product.cout){
      this.product.quantite += this.qtAchat
      this.product.revenu = this.revenuInit * this.product.quantite
      console.log(this.revenuInit)
      // faut la formule pour le cout tot avec croissance
      let coutTot= this.qtAchat * this.product.cout
      this.notifyBuy.emit(coutTot);
      this.product.cout = this.product.cout * this.product.croissance
      
    }
  }

  

}

