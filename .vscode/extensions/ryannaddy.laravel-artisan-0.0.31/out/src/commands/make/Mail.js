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
class MakeMail extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let mailName = yield this.getInput('Mail Name');
            if (mailName.length === 0) {
                this.showError('A mail name is required');
                return;
            }
            const markdown = yield this.getNoYes('Should this use markdown?');
            let command = `make:mail ${mailName} ${markdown ? '--markdown' : ''}`;
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the mailer', info.err);
                }
                else {
                    yield this.openFile(info.artisan.dir, '/app/Mail/' + mailName + '.php');
                }
            }));
        });
    }
}
exports.default = MakeMail;
//# sourceMappingURL=Mail.js.map