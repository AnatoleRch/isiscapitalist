import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { World } from './world';
import { WebserviceService } from './webservice.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProductComponent],
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
    });
    this.server = service.server
    this.user = service.user
  }
}
