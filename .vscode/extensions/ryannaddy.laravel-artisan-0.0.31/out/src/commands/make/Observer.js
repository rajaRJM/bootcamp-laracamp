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
const Common_1 = require("../../Common");
class MakeObserver extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the name of the observer to create
            let observerName = yield this.getInput('Observer Name');
            if (observerName.length === 0) {
                this.showError('An observer name is required');
                return;
            }
            let modelName = '';
            // Get the name of the model for observer
            modelName = yield this.getInput('Model Name');
            let command = `make:observer ${observerName} --model=${modelName}`;
            // Generate the observer
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the observer', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/app/Observers/' + observerName + '.php');
                }
            }));
        });
    }
}
exports.default = MakeObserver;
//# sourceMappingURL=Observer.js.map