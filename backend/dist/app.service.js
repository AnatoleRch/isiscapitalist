"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const origworld_1 = require("./origworld");
let AppService = class AppService {
    getHello() {
        throw new Error('Method not implemented.');
    }
    readUserWorld(user) {
        try {
            const data = fs.readFileSync(path.join(process.cwd(), 'userworlds/', user + '-world.json'));
            return JSON.parse(data.toString());
        }
        catch (e) {
            console.log(e.message);
            return origworld_1.origworld;
        }
    }
    saveWorld(user, world) {
        fs.writeFile(path.join(process.cwd(), 'userworlds/', user + '-world.json'), JSON.stringify(world), (err) => {
            if (err) {
                console.error(err);
                throw new Error(`Erreur d'écriture du monde coté serveur`);
            }
        });
    }
    updateProduct(product, elapsedTime, world) {
        if (product.quantite > 0) {
            if (!product.managerUnlocked) {
                if (product.timeleft > 0) {
                    if (product.timeleft <= elapsedTime) {
                        world.money += product.revenu * product.quantite;
                        world.score += product.revenu * product.quantite;
                        product.timeleft = 0;
                    }
                    else {
                        product.timeleft -= elapsedTime;
                    }
                }
            }
            else {
                const productionCycles = Math.floor(elapsedTime / product.vitesse);
                if (productionCycles > 0) {
                    world.money += productionCycles * product.revenu * product.quantite;
                }
                product.timeleft = elapsedTime % product.vitesse;
                console.log(product.timeleft);
            }
        }
    }
    updateWorld(user) {
        const world = this.readUserWorld(user);
        const currentTime = Date.now();
        const elapsedTime = currentTime - world.lastupdate;
        world.products.forEach(product => {
            this.updateProduct(product, elapsedTime, world);
        });
        world.lastupdate = currentTime;
        this.saveWorld(user, world);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map