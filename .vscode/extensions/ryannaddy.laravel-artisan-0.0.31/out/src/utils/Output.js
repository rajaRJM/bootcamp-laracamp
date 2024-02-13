"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const outputConsole = vscode_1.window.createOutputChannel('Laravel Artisan');
class Output {
    static info(message) {
        outputConsole.appendLine(`[INFO] ${message}`);
    }
    static command(message) {
        outputConsole.appendLine(`[CMD] ${message}`);
    }
    static error(message) {
        outputConsole.appendLine(`[ERR] ${message}`);
    }
    static warning(message) {
        outputConsole.appendLine(`[WARN] ${message}`);
    }
    static showConsole() {
        outputConsole.show();
    }
}
exports.default = Output;
//# sourceMappingURL=Output.js.map