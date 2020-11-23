const vscode = require('vscode');
const metadata = require('./package.json');
const fs = require('fs');
const path = require('path');

module.exports.activate = async function (context) {
  // Fire and forget the information message (it is not interactive)
  vscode.window.showInformationMessage(`${metadata.name} ${metadata.version}`);

  // Simulate extension activity concluded by outputting files with results
  await fs.promises.writeFile(path.join(__dirname, '..', 'index.log'), '👌😐👍');

  // Close VS Code once the extension is done
  await vscode.commands.executeCommand('workbench.action.closeWindow');
}
