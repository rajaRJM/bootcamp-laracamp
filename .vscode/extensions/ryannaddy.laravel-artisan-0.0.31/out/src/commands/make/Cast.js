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
class MakeCast extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let cmdName = yield this.getInput('Cast Name');
            if (cmdName.length === 0) {
                this.showError('A cast name is required');
                return;
            }
            const isInbound = yield this.getNoYes('Should I create an inbound cast?');
            const cmd = `make:cast ${cmdName} ${isInbound ? '--inbound' : ''}`;
            this.execCmd(cmd, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the cast', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/app/Casts/' + cmdName + '.php');
                }
            }));
        });
    }
}
exports.default = MakeCast;
//# sourceMappingURL=Cast.js.map