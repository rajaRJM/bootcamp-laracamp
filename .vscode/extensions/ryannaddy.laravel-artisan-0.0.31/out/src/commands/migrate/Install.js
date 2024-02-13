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
class MigrateInstall extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let database = yield this.getInput('What database should I use?');
            let command = `migrate:install ${database.length > 0 ? '--database=' + database : ''}`;
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('The migration repository was not installed', info.err);
                }
                else {
                    this.showMessage('The migration repository was installed');
                }
            }));
        });
    }
}
exports.default = MigrateInstall;
//# sourceMappingURL=Install.js.map