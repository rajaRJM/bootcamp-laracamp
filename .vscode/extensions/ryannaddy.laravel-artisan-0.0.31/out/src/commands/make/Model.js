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
class MakeModel extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the name of the controller to create
            let modelName = yield this.getInput('Model Name');
            if (modelName.length === 0) {
                this.showError('A model name is required');
                return;
            }
            let isController = false;
            let isMigration = false;
            let isResource = false;
            let isFactory = false;
            let isAll = false;
            // Determine if should we create migration,factory and resource controller
            isAll = yield this.getYesNo('Should I create a migration, factory and resource controller for the model?');
            if (!isAll) {
                // Determine if we should create a migration or not
                isMigration = yield this.getYesNo('Should I create a migration for the model?');
                // Determine if it should create a factory for this model or not
                isFactory = yield this.getYesNo('Should I create a factory for the model?');
                // Should a controller be generated?
                isController = yield this.getYesNo('Should I create a controller for the model?');
                // Ask if the controller is a resource if the previous answer was 'yes'
                if (isController) {
                    // Determine if this is a resource controller or not
                    isResource = yield this.getYesNo('Should I create the controller as a resource?');
                }
            }
            let command = `make:model ${modelName} ${isMigration ? '-m' : ''} ${isFactory ? '-f' : ''} ${isController ? '-c' : ''} ${isResource ? '-r' : ''} ${isAll ? '-a' : ''}`;
            // Generate the model
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the model', info.err);
                }
                else {
                    if (fs.existsSync(info.artisan.dir + '/app/Models/' + modelName + '.php')) {
                        yield this.openFile(info.artisan.dir, '/app/Models/' + modelName + '.php');
                    }
                    else {
                        yield this.openFile(info.artisan.dir, '/app/' + modelName + '.php');
                    }
                    if (isController || isAll) {
                        yield this.openFile(info.artisan.dir, '/app/Http/Controllers/' + modelName + 'Controller.php');
                    }
                    if (isFactory || isAll) {
                        yield this.openFile(info.artisan.dir, '/database/factories/' + modelName + 'Factory.php');
                    }
                    if (isMigration || isAll) {
                        let migration = info.stdout.match(/Created Migration:(.+)/im)[1].trim();
                        yield this.openFile(info.artisan.dir, '/database/migrations/' + migration + '.php');
                    }
                }
            }));
        });
    }
}
exports.default = MakeModel;
//# sourceMappingURL=Model.js.map