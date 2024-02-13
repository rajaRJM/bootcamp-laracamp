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
const Output_1 = require("../../utils/Output");
class RunCommand extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get a list of installed commands
            let commands = yield this.getCommandList();
            // get a list of strings for selectable options
            let items = commands.reduce((a, v) => a.concat(v.name + ' -- ' + v.description), []);
            let cmd = yield this.getListInput('Command to run', items);
            // Find the command settings from the selected option
            let commandSettings = commands.find(c => c.name === cmd.split('--')[0].trim());
            // Initialize an array of options and arguments
            let opts = [];
            let args = [];
            // Ask for information about the arguments
            for (let arg of commandSettings.arguments) {
                let input = yield this.getInput(`${arg.name} ${this.getDefaultText(arg)} ${this.getDescription(arg)}`);
                if (this.isValidInput(input)) {
                    args.push(`${input.toString().length > 0 ? input : this.toValidInput(arg.default)}`);
                }
            }
            // Ask for information about the options
            for (let opt of commandSettings.options) {
                if (opt.accept_value) {
                    let input = yield this.getInput(`${opt.name} ${this.getDefaultText(opt)} ${this.getDescription(opt)}`);
                    if (this.isValidInput(input)) {
                        let val = '';
                        opts.push(`${opt.name}${opt.is_value_required ? `=${input.length > 0 ? input : this.toValidInput(opt.default)}` : ''}`);
                    }
                    // opts.push(`${opt.name}${opt.accept_value ? `=${input.length > 0 ? input : this.toValidInput(opt.default)}` : ''}`)
                }
                else {
                    opts.push(`${opt.name}`);
                }
            }
            // Remove empty items
            args = args.filter(a => a != '');
            opts = opts.filter(a => a != '');
            let command = `${commandSettings.name} ${args.join(' ')} ${opts.join(' ')}`;
            this.execCmd(command, info => {
                if (info.err) {
                    this.showError('Could not run the command');
                }
                else {
                    let msg = '';
                    if (info.stdout.length > 0) {
                        Output_1.default.info(info.stdout);
                        msg = '(See output console for more information)';
                    }
                    this.showMessage(`Command "${commandSettings.name}" has finished ${msg}`.trim());
                }
            });
        });
    }
    static getDefaultText(obj) {
        return this.isValidInput(obj.default) && obj.default.toString().length > 0 ? `[${obj.default}]` : '';
    }
    static getDescription(obj) {
        return obj.description.toString().length > 0 ? `(${obj.description})` : '';
    }
    static isValidInput(input) {
        return ['string', 'number'].indexOf(typeof input) > -1;
    }
    static toValidInput(input) {
        return ['string', 'number'].indexOf(typeof input) > -1 ? input.toString() : '';
    }
}
exports.default = RunCommand;
//# sourceMappingURL=Command.js.map