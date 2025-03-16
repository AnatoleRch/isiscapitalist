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

  money: number = 0;
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
    if (this._qtmulti && this.product) this.calcMaxCanBuy();
  }

  progressbarvalue: number = 0
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  startProduction() {
    if (this.product.quantite >= 1) {
      this.product.timeleft = this.product.vitesse
      this.run = true
      this.sleep(this.product.vitesse).then(() => { this.run = false });
    }
  }

  calcMaxCanBuy() {
    const maxQuantity = Math.floor(Math.log((-this.money / this.product.cout) * (1 - this.product.croissance) + 1) / Math.log(this.product.croissance));
    return maxQuantity;
  }

}

