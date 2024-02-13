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
class MakeController extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the name of the controller to create
            let ctrlName = yield this.getInput('Controller Name');
            if (ctrlName.length === 0) {
                this.showError('A controller name is required');
                return;
            }
            // Determine the type of controller (basic, resource, api)
            let type = (yield this.getListInput('What type of controller is this?', ['Basic', 'Resource', 'API'])).toLowerCase();
            let refModel = false;
            let modelToUse = '';
            if (type != 'basic') {
                // Determine the model reference
                refModel = yield this.getYesNo('Should this reference a model?');
                if (refModel) {
                    modelToUse = yield this.getInput('What is the name of the model?');
                }
            }
            let modelToUseCommand = refModel ? `--model=${modelToUse} --no-interaction` : '';
            let typeCommand = type === 'resource' ? '--resource' : type === 'api' ? '--api' : '';
            let command = `make:controller ${ctrlName} ${typeCommand} ${modelToUseCommand}`;
            // let command = `make:controller ${ctrlName} ${isResource ? '--resource' : ''} ${isAPI ? '--api' : ''}`.trim()
            // Generate the controller
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                console.log('info', info);
                if (info.err) {
                    this.showError('Could not create the controller', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/app/Http/Controllers/' + ctrlName + '.php');
                }
            }));
        });
    }
}
exports.default = MakeController;
//# sourceMappingURL=Controller.js.map