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
class MakePolicy extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let policyName = yield this.getInput('Policy Name');
            if (policyName.length === 0) {
                this.showError('A policy name is required');
                return;
            }
            let model = yield this.getInput('What model should I apply this policy to?');
            let command = `make:policy ${policyName} ${model.length > 0 ? '--model=' + model : ''}`;
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the policy', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/app/Policies/' + policyName + '.php');
                }
            }));
        });
    }
}
exports.default = MakePolicy;
//# sourceMappingURL=Policy.js.map