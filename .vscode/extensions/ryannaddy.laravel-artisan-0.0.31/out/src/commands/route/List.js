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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const Common_1 = require("../../Common");
class RouteList extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscription = this.observable.subscribe();
        });
    }
    static runCommand(cmd) {
        return new rxjs_1.Observable(sub => {
            this.execCmd(cmd, (info) => __awaiter(this, void 0, void 0, function* () {
                sub.next(info);
                sub.complete();
            }));
        });
    }
    static parseRouteList(stdout) {
        const data = JSON.parse(stdout);
        console.log('data', data);
        // {domain: null, method: 'GET|HEAD', uri: '/', name: null, action: 'Closure', middleware: []}
        const rows = data.map((row) => {
            return [row.method, row.uri, row.name, row.action, row.middleware.join(', ')];
        });
        return { headers: ['Method', 'URI', 'Name', 'Action', 'Middleware'], rows };
    }
}
_a = RouteList;
RouteList.headers = ['Method', 'URI', 'Name', 'Action', 'Middleware'];
RouteList.observable = (0, rxjs_1.timer)(0, 5000).pipe((0, operators_1.map)(() => 'route:list --json'), (0, operators_1.tap)(() => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof RouteList.panel === 'undefined') {
        const artisan = yield Common_1.default.getArtisanRoot();
        RouteList.panel = yield Common_1.default.openVirtualHtmlFile('route-list', 'Route List', RouteList.headers, [], artisan);
        RouteList.panel.onDidDispose(() => {
            RouteList.subscription.unsubscribe();
            RouteList.panel = undefined;
        });
    }
})), (0, operators_1.filter)(() => typeof RouteList.panel !== 'undefined'), (0, rxjs_1.exhaustMap)(cmd => RouteList.runCommand(cmd)), (0, operators_1.filter)(info => {
    if (info.err) {
        Common_1.default.showError('The route list could not be generated.', info.err);
        return false;
    }
    return true;
}), (0, operators_1.switchMap)(c => (0, rxjs_1.of)(c).pipe((0, operators_1.map)(info => RouteList.parseRouteList(info.stdout)), (0, operators_1.tap)(info => RouteList.panel.webview.postMessage({ rows: info.rows })))));
exports.default = RouteList;
//# sourceMappingURL=List.js.map