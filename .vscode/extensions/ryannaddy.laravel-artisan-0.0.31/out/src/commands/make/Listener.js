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
class MakeListener extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let listenerName = yield this.getInput('Listener Name');
            if (listenerName.length === 0) {
                this.showError('A listener name is required');
                return;
            }
            let event = yield this.getInput('What event class should I listen for?');
            let queued = yield this.getYesNo('Should I make the listener queued?');
            let command = `make:listener ${listenerName} ${event.length > 0 ? '--event=' + event : ''} ${queued ? '--queued' : ''}`;
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the listener', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/app/Listeners/' + listenerName + '.php');
                }
            }));
        });
    }
}
exports.default = MakeListener;
//# sourceMappingURL=Listener.js.map