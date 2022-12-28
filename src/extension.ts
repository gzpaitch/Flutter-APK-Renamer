import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let lastUsedName = '';

export function activate(context: vscode.ExtensionContext) {
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

export function deactivate() {}