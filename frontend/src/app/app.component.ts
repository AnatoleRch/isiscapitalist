import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { World } from './world';
import { WebserviceService } from './webservice.service';
import { BigvaluePipe } from "./bigvalue.pipe";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent, BigvaluePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  world: World = new World();
  server = ''
  user = '';
  constructor(private service: WebserviceService) {
    service.getWorld(service.user).then(
    world => {
      this.world = world.data.getWorld;
      console.dir(this.world)
      console.log(this.world.products[0].logo)
    });
    this.server = service.server
    this.user = service.user
  }
}
