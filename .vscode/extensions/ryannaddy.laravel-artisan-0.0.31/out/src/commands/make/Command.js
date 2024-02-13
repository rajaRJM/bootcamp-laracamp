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
class MakeCommand extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let cmdName = yield this.getInput('Command Class Name');
            if (cmdName.length === 0) {
                this.showError('A command name is required');
                return;
            }
            let consoleName = yield this.getInput('What is the terminal command name? (Default is "command:name")');
            let command = `make:command ${cmdName} ${consoleName.length > 0 ? '--command=' + consoleName : ''}`;
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the command', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/app/Console/Commands/' + cmdName + '.php');
                }
            }));
        });
    }
}
exports.default = MakeCommand;
//# sourceMappingURL=Command.js.map