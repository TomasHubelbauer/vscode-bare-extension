const vscode = require('vscode');
const metadata = require('./package.json');
const path = require('path');

module.exports.activate = async function (context) {
  try {
    // Fire and forget the information message (it is not interactive)
    vscode.window.showInformationMessage(`${metadata.name} ${metadata.version}`);

    // Carry out some work to demonstrate the extension using the VS Code API
    const textDocument = await vscode.workspace.openTextDocument(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'index.log'));
    const textEditor = await vscode.window.showTextDocument(textDocument, vscode.ViewColumn.Active);
    await textEditor.edit(editBuilder => editBuilder.insert(new vscode.Position(0, 0), 'Test'));
    await textDocument.save();
  }
  catch (error) {
    await vscode.window.showErrorMessage(error.toString());
  }
  finally {
    // Close VS Code once the extension is done
    await vscode.commands.executeCommand('workbench.action.closeWindow');
  }
}
