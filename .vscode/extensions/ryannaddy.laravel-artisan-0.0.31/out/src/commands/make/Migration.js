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
class MakeMigration extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the name of the controller to create
            let migrationName = yield this.getInput('Migration Name');
            if (migrationName.length === 0) {
                this.showError('A migration name is required');
                return;
            }
            let createTable = false;
            let modifyTable = false;
            let tableName = '';
            // Determine if this is a resource controller or not
            createTable = yield this.getYesNo('Will this migration create a table?');
            if (!createTable) {
                modifyTable = yield this.getYesNo('Will this migration modify an existing table?');
            }
            if (createTable || modifyTable) {
                tableName = yield this.getInput('What is the name of the table?');
            }
            let command = `make:migration "${migrationName}" ${createTable ? '--create=' + tableName : ''} ${modifyTable ? '--table=' + tableName : ''}`;
            // Generate the controller
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the migration', info.err);
                }
                else {
                    let file = info.stdout.replace(/^.+:/gi, '').trim();
                    yield this.openFile(info.artisan.dir, '/database/migrations/' + file + '.php');
                }
            }));
        });
    }
}
exports.default = MakeMigration;
//# sourceMappingURL=Migration.js.map