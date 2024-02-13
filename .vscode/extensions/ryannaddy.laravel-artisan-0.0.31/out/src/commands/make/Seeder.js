"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Common_1 = require("../../Common");
class MakeSeeder extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let seedName = yield this.getInput('Seeder Name');
            if (seedName.length === 0) {
                this.showError('A seeder name is required');
                return;
            }
            let command = `make:seeder ${seedName}`;
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the seeder', info.err);
                }
                else {
                    if (fs.existsSync(info.artisan.dir + '/database/seeders/' + seedName + '.php')) {
                        yield this.openFile(info.artisan.dir, '/database/seeders/' + seedName + '.php');
                    }
                    else {
                        yield this.openFile(info.artisan.dir, '/database/seeds/' + seedName + '.php');
                    }
                }
            }));
        });
    }
}
exports.default = MakeSeeder;
//# sourceMappingURL=Seeder.js.map