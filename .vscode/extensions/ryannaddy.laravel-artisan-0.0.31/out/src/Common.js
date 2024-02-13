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
const cp = require("child_process");
const path_1 = require("path");
const vscode_1 = require("vscode");
const Output_1 = require("./utils/Output");
class Common {
    /**
     * Get a list of all artisan files in the workspace.
     */
    static listArtisanPaths() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = vscode_1.workspace.getConfiguration('artisan');
            let additionalLocations = config.get('location');
            additionalLocations = typeof additionalLocations === 'string' ? new Array(1).concat(additionalLocations) : additionalLocations;
            let list = this.artisanFileList.concat(additionalLocations.map(i => vscode_1.Uri.parse(i)));
            if (list.length === 1 && list[0].fsPath.length)
                return list[0].fsPath;
            else if (list.length === 0)
                return 'artisan';
            let artisanToUse = yield Common.getListInput('Which artisan should execute this command?', list
                // Get the fs path from the URI
                .map(i => i.fsPath)
                // Remove Non-String values
                .filter(String)
                // Remove Duplicates
                .filter((v, i, a) => a.indexOf(v) === i));
            return artisanToUse;
        });
    }
    /**
     * Gets an artisan file from the workspace.
     * @param artisan The artisan path to use. If not specified then the user will be prompted to select one.
     */
    static getArtisanRoot(artisan) {
        return __awaiter(this, void 0, void 0, function* () {
            const artisanToUse = artisan ? artisan : yield this.listArtisanPaths();
            return artisanToUse.replace(/artisan$/, '').replace(/\\$/g, '');
        });
    }
    /**
     * Executes an artisan command.
     * @param command The command to execute.
     * @param callback The callback to execute when the command is finished.
     * @param artisan The artisan path to use. If not specified then the user will be prompted to select one.
     */
    static execCmd(command, callback, artisan) {
        return __awaiter(this, void 0, void 0, function* () {
            const artisanToUse = artisan ? artisan : yield this.listArtisanPaths();
            const artisanRoot = yield this.getArtisanRoot(artisan);
            // Try an get a custom php location
            const config = vscode_1.workspace.getConfiguration('artisan');
            const phpLocation = config.get('php.location', 'php');
            const dockerEnabled = config.get('docker.enabled', false);
            const dockerCommand = config.get('docker.command', null);
            const maxBuffer = config.get('maxBuffer', 1024 * 200);
            const wsl = config.get('wsl.enabled', false);
            let cmd = '';
            if (dockerEnabled) {
                command = `php artisan ${command}`;
                cmd = `${dockerCommand} ${command}`;
            }
            else {
                if (phpLocation === 'php') {
                    command = `php artisan ${command}`;
                }
                else {
                    // Location is in quotes so that it can support spaces in the path
                    command = `"${phpLocation}" artisan ${command}`;
                }
                cmd = command;
            }
            Output_1.default.command(command.trim());
            vscode_1.window.withProgress({
                location: vscode_1.ProgressLocation.Window,
                cancellable: false,
                title: 'Executing Artisan Command',
            }, (progress) => __awaiter(this, void 0, void 0, function* () {
                progress.report({ increment: 0 });
                if (wsl) {
                    yield Common.wslCommand(callback, artisanRoot, artisanToUse, cmd);
                }
                else {
                    yield Common.nonWslCommand(callback, artisanRoot, artisanToUse, cmd, maxBuffer);
                }
                progress.report({ increment: 100 });
            }));
        });
    }
    /**
     * Executes an artisan command when not using WSL.
     * @param callback The callback to execute when the command is finished.
     * @param artisanRoot The root directory of the artisan file.
     * @param artisanToUse The artisan file to use.
     * @param cmd The command to execute.
     * @param maxBuffer The max buffer size to use.
     */
    static nonWslCommand(callback, artisanRoot, artisanToUse, cmd, maxBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                cp.exec(cmd, {
                    cwd: artisanRoot,
                    maxBuffer: maxBuffer,
                }, (err, stdout, stderr) => {
                    Output_1.default.command(stdout.trim());
                    Output_1.default.showConsole();
                    if (err) {
                        Output_1.default.command('-----------------------------------');
                        Output_1.default.error(err.message.trim());
                        Output_1.default.showConsole();
                        resolve();
                    }
                    else {
                        reject(err);
                    }
                    callback({
                        err,
                        stdout,
                        stderr,
                        artisan: {
                            dir: artisanRoot,
                            path: artisanToUse,
                        },
                    });
                });
            });
        });
    }
    /**
     * Executes an artisan command when using WSL.
     * @param callback The callback to execute when the command is finished.
     * @param artisanRoot The root directory of the artisan file.
     * @param artisanToUse The artisan file to use.
     * @param cmd The command to execute.
     */
    static wslCommand(callback, artisanRoot, artisanToUse, cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log('wsl', cmd);
                const child = cp.spawn('wsl', [cmd], {
                    cwd: artisanRoot,
                    shell: true,
                });
                child.stdout.on('data', data => {
                    callback({
                        err: undefined,
                        stdout: data.toString(),
                        stderr: undefined,
                        artisan: {
                            dir: artisanRoot,
                            path: artisanToUse,
                        },
                    });
                    resolve();
                });
                child.stderr.on('error', err => {
                    callback({
                        err,
                        stdout: undefined,
                        stderr: undefined,
                        artisan: {
                            dir: artisanRoot,
                            path: artisanToUse,
                        },
                    });
                    reject();
                });
            });
        });
    }
    /**
     * Opens a file in the editor.
     * @param root The root directory.
     * @param filename The filename to open.
     */
    static openFile(root, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let doc = await workspace.openTextDocument(this.artisanRoot + '/' + filename)
                let doc = yield vscode_1.workspace.openTextDocument((0, path_1.join)(root, filename));
                vscode_1.window.showTextDocument(doc);
                this.refreshFilesExplorer();
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    /**
     * Parses a cli table generated by artisan.
     * @param cliTable The cli table to parse.
     */
    static parseCliTable(cliTable) {
        let cliRows = cliTable.split(/\r\n|\n/g);
        let headers = [];
        let rows = [];
        // Parse the cli table
        for (let i = 0, len = cliRows.length; i < len; i++) {
            if (i === 0 || i === 2) {
                continue;
            }
            else if (i === 1) {
                (headers = cliRows[i].split('|')).forEach((v, k) => {
                    headers[k] = v.replace(/[\u001b\u009b][[()#?]*(?:[0-9]{1,4}(?:[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').trim();
                    if (headers[k] === '') {
                        delete headers[k];
                    }
                });
            }
            else {
                if (cliRows[i].indexOf('|') > -1) {
                    let row = [];
                    cliRows[i].split(/ \| /g).forEach(v => {
                        row.push(v.replace(/^\||\|$/g, '').trim());
                    });
                    rows.push(row);
                }
            }
        }
        return { headers: headers, rows: rows };
    }
    static get tableStyle() {
        return `<style>
      * { box-sizing: border-box; }
      body { padding: 0; margin: 0; }
      table { border-collapse: collapse; width: 95vw; margin: auto; }
      table thead { font-size: 16px; text-align: left; }
      table tbody { font-size: 14px; }
      table td, table th { padding: 10px; }
      table tbody tr:nth-child(odd) { background-color: rgba(0,0,0,0.25); }
      table td a { color: #4080d0; cursor: pointer; }
      .hidden { display: none; }
      .search { padding-top: 15px; padding-bottom: 15px; width: 95vw; margin: auto; }
      #filter { display: block; padding: 5px; width: 100%; }
      .loading { text-align: center; }
      .filters { display: flex; flex-direction: row; gap: 20px; justify-content: start; }
      .text-filter-wrapper { display: flex; flex-direction: row; gap: 20px; place-items: center; }
      .text-filter-wrapper label { width: 150px }
      label { display: flex; flex-direction: row; gap: 5px; place-items: center; }
    </style>`;
    }
    /**
     * Opens a virtual Laravel routes list.
     * @param openPath The path to open.
     * @param title The title of the file.
     * @param headers The headers of the table.
     * @param rows The rows of the table.
     * @param artisanRoot The root directory of the artisan file.
     */
    static openVirtualHtmlFile(openPath, title, headers, rows, artisanRoot) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = `
      <div class="search">
        <div class="text-filter-wrapper">
          <input type="text" id="filter" placeholder="Search for an item (RegExp Supported)">
          <label>
            <input type="checkbox" id="filter-invert"> Invert Search
          </label>
        </div>
        <p class="filters">`;
            headers.forEach(header => {
                html += `
        <label>
          <input type="checkbox" id="filter-${header.toLowerCase()}" checked> Display ${header}
        </label>`;
            });
            html += `</p></div>`;
            html += '<h2 class="loading">Loading Route Information...</h2>';
            html += `${this.tableStyle}<table class="hidden">`;
            html += '<thead><tr>';
            headers.forEach(header => {
                html += `<th id="header_${header}">${header}</th>`;
            });
            html += '</tr></thead><tbody>';
            rows.forEach((row, rowIdx) => {
                html += '<tr>';
                row.forEach((item, colIdx) => {
                    if ((item !== null && item !== void 0 ? item : '').match(/app\\/i)) {
                        html +=
                            `<td id="cell_${rowIdx}_${headers[colIdx]}">
              <a href="file:///${vscode_1.workspace.rootPath}/${item.replace(/@.+$/, '').replace(/^App/g, 'app')}.php" data-method="${item.replace(/^.+@/, '')}" class="app-item">` +
                                item +
                                '</a></td>';
                    }
                    else {
                        html += '<td id="cell_' + rowIdx + '_' + headers[colIdx] + '">' + item + '</td>';
                    }
                });
                html += '</tr>';
            });
            html += '</tbody></table>';
            html += `<script>
    const filter = document.querySelector('#filter')
    const body = document.querySelector('table tbody')
    const invertCheckbox = document.querySelector('#filter-invert')
    const rootPath = '${artisanRoot.replace(/\\/g, '/')}'
    const headers = ${JSON.stringify(headers)}
    const vscode = acquireVsCodeApi()
    filter.focus()
    const table = document.querySelector('table')
    const loading = document.querySelector('.loading')
    invertCheckbox.addEventListener('change', e => filterItems())
    `;
            headers.forEach(header => {
                html += `
      const ${header}Checkbox = document.querySelector('#filter-${header.toLowerCase()}')
      let shouldShow${header} = true
      ${header}Checkbox.addEventListener('change', e => {
        shouldShow${header} = e.currentTarget.checked
        filterItems()
      });
      `;
            });
            // Begin filter items function
            html += `
    function filterItems() {
      let v = filter.value
      let shouldInvert = invertCheckbox.checked
      document.querySelectorAll('tbody > tr').forEach(row => {
        let txt = row.textContent
        let reg = new RegExp(v, 'ig')
        // If the row matches the regular expression or the value is empty, show the row
        // If the search is inverted, hide the row if it matches the regular expression
        if(v.length === 0) {
          row.classList.remove('hidden')
        } else {
          if (!shouldInvert) {
            reg.test(txt)?row.classList.remove('hidden'):row.classList.add('hidden')
          } else {
            !reg.test(txt)?row.classList.remove('hidden'):row.classList.add('hidden')
          }
        }
      })
    `;
            headers.forEach(header => {
                html += `
      const ${header}Header = document.querySelector('#header_${header}')
      const ${header}Checkbox = document.querySelector('#filter-${header.toLowerCase()}')
      ${header}Checkbox.addEventListener('change', e => {
        if (e.currentTarget.checked) {
          ${header}Header.classList.remove('hidden')
        } else {
          ${header}Header.classList.add('hidden')
        }
      });
      `;
            });
            headers.forEach(header => {
                html += `
      document.querySelectorAll('tbody > tr').forEach((row, rowIdx) => {
        const ${header} = row.querySelector('#cell_' + rowIdx + '_${header}')
        if (${header} && !shouldShow${header}) {
          ${header}.classList.add('hidden')
        } else if (${header} && shouldShow${header}) {
          ${header}.classList.remove('hidden')
        }
      });
      `;
            });
            // End filter items function
            html += `}`;
            html += `
    function routeEvents(){
      Array.from(body.querySelectorAll('a')).forEach(item => {
        item.addEventListener('click', e => {
          e.preventDefault()
          let target = e.currentTarget
          vscode.postMessage({ file: target.href, method: target.getAttribute('data-method') })
        })
      })
    }

    filter.addEventListener('input', filterItems)
    window.addEventListener('message', msg => {
      let rows = msg.data.rows
      if(rows.length >0){
        table.classList.remove('hidden')
        loading.classList.add('hidden')
      }
      let html = ''
      rows.forEach((row, rowIdx) => {
        html += '<tr>'
        row.forEach((item, colIdx) => {
          if ((item??'').match(/app\\\\/i)) {
            let file = \`\${rootPath}/\${item.replace(/@.+$/, '').replace(/^App/, 'app')}.php\`.replace(/\\\\/g, '/')
            html += \`<td  id="cell_\${rowIdx}_\${headers[colIdx]}"><a href="\${file}" data-method="\${item.replace(/^.+@/, '')}" class="app-item">\` + item + '</a></td>'
          } else {
            html += '<td id="cell_' + rowIdx + '_' + headers[colIdx] + '">' + item + '</td>'
          }
        })
        html += '</tr>'
      })
      body.innerHTML = html
      filterItems()
      routeEvents()
    })
    routeEvents()
  </script>`;
            const panel = vscode_1.window.createWebviewPanel(openPath, title, vscode_1.ViewColumn.Active, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });
            panel.webview.html = html;
            panel.webview.onDidReceiveMessage((msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg.file) {
                    let uri = vscode_1.Uri.parse(msg.file);
                    let method = msg.method || '';
                    let doc = yield vscode_1.workspace.openTextDocument(uri);
                    let activeDoc = yield vscode_1.window.showTextDocument(doc);
                    if (method.length > 0) {
                        let idx = doc.getText().indexOf(`function ${method}`);
                        if (idx > -1) {
                            let pos = doc.positionAt(idx + 9);
                            activeDoc.selection = new vscode_1.Selection(pos, pos);
                        }
                    }
                }
            }));
            return panel;
        });
    }
    /**
     * Shows an input box and returns the value.
     * @param placeHolder The placeholder text.
     */
    static getInput(placeHolder) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = yield vscode_1.window.showInputBox({
                placeHolder: placeHolder.replace(/\s\s+/g, ' ').trim(),
            });
            name = typeof name === 'undefined' ? '' : name;
            // if (name.length === 0) {
            //   window.showErrorMessage('Invalid ' + placeHolder)
            //   return ''
            // }
            return name;
        });
    }
    /**
     * Shows a list of items and returns the selected item.
     * @param placeHolder The placeholder text.
     * @param list The list of items to choose from.
     */
    static getListInput(placeHolder, list) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = yield vscode_1.window.showQuickPick(list, { placeHolder: placeHolder });
            name = typeof name === 'undefined' ? '' : name;
            return name;
        });
    }
    /**
     * Shows a Yes/No dialog (where `yes` is first in the list) and returns the result.
     * @param placeHolder The placeholder text.
     */
    static getYesNo(placeHolder) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield vscode_1.window.showQuickPick(['Yes', 'No'], { placeHolder });
            return value.toLowerCase() === 'yes' ? true : false;
        });
    }
    /**
     * Shows a No/Yes dialog (where `no` is first in the list) and returns the result.
     * @param placeHolder The placeholder text.
     */
    static getNoYes(placeHolder) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield vscode_1.window.showQuickPick(['No', 'Yes'], { placeHolder });
            return value.toLowerCase() === 'yes' ? true : false;
        });
    }
    /**
     * Shows snackbar message to the user.
     * @param message The message to show.
     */
    static showMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            vscode_1.window.showInformationMessage(message);
            return true;
        });
    }
    /**
     * Shows snackbar error message to the user.
     * @param message The message to show.
     * @param consoleErr The message to show in console.
     */
    static showError(message, consoleErr = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (consoleErr !== null) {
                message += ' (See output console for more details)';
                console.error(consoleErr + ' (See output console for more details)');
            }
            vscode_1.window.showErrorMessage(message);
            return false;
        });
    }
    /**
     * Refreshes the files explorer.
     */
    static refreshFilesExplorer() {
        vscode_1.commands.executeCommand('workbench.files.action.refreshFilesExplorer');
    }
    /**
     * Get a list of all artisan commands.
     */
    static getCommandList() {
        return new Promise(resolve => {
            this.execCmd(`list --format=json`, info => {
                let commands = JSON.parse(info.stdout).commands;
                let commandList = [];
                commands.forEach(command => {
                    let commandItem = {
                        name: command.name,
                        description: command.description,
                        options: [],
                        arguments: [],
                    };
                    for (let i in command.definition.options) {
                        if (['help', 'quiet', 'verbose', 'version', 'ansi', 'no-ansi', 'no-interaction', 'env'].indexOf(i) > -1)
                            continue;
                        commandItem.options.push(command.definition.options[i]);
                    }
                    for (let i in command.definition.arguments) {
                        commandItem.arguments.push(command.definition.arguments[i]);
                    }
                    commandList.push(commandItem);
                });
                resolve(commandList);
            });
        });
    }
}
Common.artisanFileList = [];
exports.default = Common;
//# sourceMappingURL=Common.js.map