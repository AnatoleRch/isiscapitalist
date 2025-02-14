import { World } from "./world"
import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import {
  GET_WORLD
} from './Grapqhrequests'
@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  //server = 'http://localhost:4000/';
  server = 'http://localhost:4000/';
  user = 'toto';
  world: World = new World();
  constructor(private service: WebserviceService) {
    service.getWorld(this.user).then(
    world => {
    this.world = world.data.getWorld;
    });
  }
  createClient() {
    return new Client({ url: this.server, exchanges: [fetchExchange] });
  }
  getWorld(user: string) {
    return this.createClient().query(GET_WORLD, { "user": user}).toPromise();
  }
}
