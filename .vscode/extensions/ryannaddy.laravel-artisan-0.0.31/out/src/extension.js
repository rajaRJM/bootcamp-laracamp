'use strict';
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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const Common_1 = require("./Common");
const TextDocumentProvider_1 = require("./TextDocumentProvider");
// Base files
const ClearCompiled_1 = require("./commands/base/ClearCompiled");
const List_1 = require("./commands/base/List");
const Migrate_1 = require("./commands/base/Migrate");
const Optimize_1 = require("./commands/base/Optimize");
const Serve_1 = require("./commands/base/Serve");
// Make files
const Auth_1 = require("./commands/make/Auth");
const Command_1 = require("./commands/make/Command");
const Component_1 = require("./commands/make/Component");
const Controller_1 = require("./commands/make/Controller");
const Event_1 = require("./commands/make/Event");
const Factory_1 = require("./commands/make/Factory");
const Job_1 = require("./commands/make/Job");
const Listener_1 = require("./commands/make/Listener");
const Mail_1 = require("./commands/make/Mail");
const Middleware_1 = require("./commands/make/Middleware");
const Migration_1 = require("./commands/make/Migration");
const Model_1 = require("./commands/make/Model");
const Notification_1 = require("./commands/make/Notification");
const Observer_1 = require("./commands/make/Observer");
const Policy_1 = require("./commands/make/Policy");
const Provider_1 = require("./commands/make/Provider");
const Request_1 = require("./commands/make/Request");
const Resource_1 = require("./commands/make/Resource");
const Seeder_1 = require("./commands/make/Seeder");
const Test_1 = require("./commands/make/Test");
// Migrate files
const Fresh_1 = require("./commands/migrate/Fresh");
const Install_1 = require("./commands/migrate/Install");
const Refresh_1 = require("./commands/migrate/Refresh");
const Reset_1 = require("./commands/migrate/Reset");
const Rollback_1 = require("./commands/migrate/Rollback");
const Status_1 = require("./commands/migrate/Status");
// Cache files
const Clear_1 = require("./commands/cache/Clear");
const Table_1 = require("./commands/cache/Table");
// Route files
const Cache_1 = require("./commands/route/Cache");
const Clear_2 = require("./commands/route/Clear");
const List_2 = require("./commands/route/List");
const Refresh_2 = require("./commands/route/Refresh");
// Cache files
const Cache_2 = require("./commands/config/Cache");
const Clear_3 = require("./commands/config/Clear");
const Refresh_3 = require("./commands/config/Refresh");
// Key files
const Generate_1 = require("./commands/key/Generate");
// Event files
const Generate_2 = require("./commands/event/Generate");
// View files
const Clear_4 = require("./commands/view/Clear");
const Channel_1 = require("./commands/make/Channel");
const Command_2 = require("./commands/run/Command");
const Cast_1 = require("./commands/make/Cast");
const Rule_1 = require("./commands/make/Rule");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let files = yield vscode_1.workspace.findFiles('**/artisan', undefined);
        files.forEach(file => Common_1.default.artisanFileList.push(file));
        // Base commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.clearCompiled', () => { ClearCompiled_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.migrate', () => { Migrate_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.optimize', () => { Optimize_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.startServer', () => { Serve_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.startServerUseDefaults', () => { Serve_1.default.run(true); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.stopServer', () => { Serve_1.default.stop(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.restartServer', () => { Serve_1.default.restart(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.list', () => { List_1.default.run(); }));
        // Make commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.auth', () => { Auth_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.cast', () => { Cast_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.channel', () => { Channel_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.command', () => { Command_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.controller', () => { Controller_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.component', () => { Component_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.factory', () => { Factory_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.event', () => { Event_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.listener', () => { Listener_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.mail', () => { Mail_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.job', () => { Job_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.middleware', () => { Middleware_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.model', () => { Model_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.migration', () => { Migration_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.notification', () => { Notification_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.observer', () => { Observer_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.policy', () => { Policy_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.provider', () => { Provider_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.request', () => { Request_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.resource', () => { Resource_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.rule', () => { Rule_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.seeder', () => { Seeder_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.make.test', () => { Test_1.default.run(); }));
        // Migrate commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.migrate.install', () => { Install_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.migrate.refresh', () => { Refresh_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.migrate.reset', () => { Reset_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.migrate.rollback', () => { Rollback_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.migrate.status', () => { Status_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.migrate.fresh', () => { Fresh_1.default.run(); }));
        // Cache commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.cache.clear', () => { Clear_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.cache.table', () => { Table_1.default.run(); }));
        // Route commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.route.cache', () => { Cache_1.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.route.clear', () => { Clear_2.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.route.refresh', () => { Refresh_2.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.route.list', () => { List_2.default.run(); }));
        // Config commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.config.cache', () => { Cache_2.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.config.clear', () => { Clear_3.default.run(); }));
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.config.refresh', () => { Refresh_3.default.run(); }));
        // Key commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.key.generate', () => { Generate_1.default.run(); }));
        // Event commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.event.generate', () => { Generate_2.default.run(); }));
        // View commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.view.clear', () => { Clear_4.default.run(); }));
        // All commands
        context.subscriptions.push(vscode_1.commands.registerCommand('artisan.run.command', () => { Command_2.default.run(); }));
        // Register document provider for virtual files
        context.subscriptions.push(vscode_1.workspace.registerTextDocumentContentProvider('laravel-artisan', new TextDocumentProvider_1.default()));
        console.log('Laravel Artisan: activated');
    });
}
exports.activate = activate;
function deactivate() {
    console.log('Laravel Artisan: deactivated');
    Serve_1.default.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map