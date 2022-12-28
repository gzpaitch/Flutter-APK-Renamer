"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
let lastUsedName = '';
function activate(context) {
    let watcher = vscode.workspace.createFileSystemWatcher('**/build/app/outputs/flutter-apk/app-release.apk');
    watcher.onDidCreate(async (uri) => {
        const filePath = uri.fsPath;
        const fileName = path.basename(filePath);
        let newFileName = await vscode.window.showInputBox({
            prompt: `Enter a new name for the file: ${fileName}.apk`,
            value: lastUsedName
        });
        if (!newFileName) {
            return;
        }
        if (!newFileName.endsWith('.apk')) {
            newFileName += '.apk';
            return;
        }
        const newFilePath = path.join(path.dirname(filePath), `${newFileName}.apk`);
        fs.renameSync(filePath, newFilePath);
        const moveFile = await vscode.window.showQuickPick(['Yes', 'No'], {
            placeHolder: `Do you want to move the file to a different folder on your computer?`
        });
        if (moveFile === 'Yes') {
            const targetPath = await vscode.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: 'Select the target folder'
            });
            if (!targetPath) {
                return;
            }
            fs.copyFileSync(newFilePath, path.join(targetPath[0].fsPath, `${newFileName}.apk`));
            fs.unlinkSync(newFilePath);
        }
    });
    context.subscriptions.push(watcher);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map