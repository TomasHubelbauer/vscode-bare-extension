const vscode = require('vscode');
const metadata = require('./package.json');

module.exports.activate = function () {
  vscode.window.showInformationMessage(`${metadata.name} ${metadata.version}`);
}
