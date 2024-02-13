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
class MakeComponent extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the name of the component to create
            let componentName = yield this.getInput('Component Name');
            if (componentName.length === 0) {
                this.showError('A component name is required');
                return;
            }
            let inlineView = false;
            // Determine the type of view (basic, inline)
            inlineView = yield this.getNoYes('Should this render an inline view?');
            console.log('inlineView: ' + inlineView);
            let inlineOption = inlineView ? '--inline' : '';
            let command = `make:component ${inlineOption} ${componentName}`;
            // Generate the component
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create component', info.err);
                }
                else {
                    if (inlineView === false) {
                        yield this.openFile(info.artisan.dir, '/app/View/Components/' + componentName + '.php');
                    }
                    else {
                        yield this.openFile(info.artisan.dir, '/resources/views/components/' + componentName + '.blade.php');
                    }
                }
            }));
        });
    }
}
exports.default = MakeComponent;
//# sourceMappingURL=Component.js.map