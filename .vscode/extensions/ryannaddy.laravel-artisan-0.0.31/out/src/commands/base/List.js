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
class List extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let command = `list --format=json`;
            // Generate the controller
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not get the list', info.err);
                }
                else {
                    let list = JSON.parse(info.stdout);
                    let headers = [];
                    let rows = [];
                    headers.push('Name', 'Description', 'Arguments', 'Options');
                    let i = 0;
                    list.commands.forEach(command => {
                        let row = rows[i] = [];
                        row.push(command.name);
                        row.push(command.description);
                        if (command.definition.arguments.name) {
                            let name = command.definition.arguments.name;
                            row.push(name.name + (name.is_required ? '' : ' (Optional) ') + ' &ndash; ' + name.description);
                        }
                        else {
                            row.push('');
                        }
                        let opts = [];
                        for (let i in command.definition.options) {
                            if (['help', 'quiet', 'version', 'ansi', 'no-ansi', 'no-interaction', 'env', 'verbose'].indexOf(i) > -1)
                                continue;
                            let name = command.definition.options[i].name;
                            let descr = command.definition.options[i].description;
                            opts.push(name + ' &ndash; ' + descr);
                        }
                        row.push(opts.join('<br>'));
                        i++;
                    });
                    this.openVirtualHtmlFile('artisan-list', 'Artisan Commands', headers, rows, info.artisan.dir);
                }
            }));
        });
    }
}
exports.default = List;
//# sourceMappingURL=List.js.map