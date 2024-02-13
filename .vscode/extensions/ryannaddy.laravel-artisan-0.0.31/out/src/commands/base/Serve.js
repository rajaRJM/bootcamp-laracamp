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
const vscode_1 = require("vscode");
const Common_1 = require("../../Common");
class Server extends Common_1.default {
    static run(useDefaults = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = vscode_1.workspace.getConfiguration("artisan");
            let defaultHost = config.get("serve.defaultHost", 'localhost');
            let defaultPort = config.get("serve.defaultPort", '8000');
            let phpLocation = config.get('php.location', 'php');
            let host = useDefaults ? defaultHost : yield this.getInput(`Should I use a specific host (Default: ${defaultHost})?`);
            let port = useDefaults ? defaultPort : yield this.getInput(`Should I use a specific port (Default: ${defaultPort})?`);
            Server.host = host.length > 0 ? host : defaultHost;
            Server.port = port.length > 0 ? port : defaultPort;
            let artisanToUse = yield this.listArtisanPaths();
            Server.terminal = vscode_1.window.createTerminal('Laravel Artisan Server');
            Server.terminal.show();
            Server.terminal.sendText(`${phpLocation} "${artisanToUse}" serve --host=${Server.host} --port=${Server.port}`);
            this.showMessage(`The server is now running on "http://${Server.host}:${Server.port}"`);
        });
    }
    static stop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Server.terminal) {
                Server.terminal.dispose();
                this.showMessage(`The server has been stopped on "http://${Server.host}:${Server.port}"`);
            }
            else {
                this.showError('There is no server currently running');
            }
        });
    }
    static restart() {
        return __awaiter(this, void 0, void 0, function* () {
            Server.stop();
            Server.run();
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Serve.js.map