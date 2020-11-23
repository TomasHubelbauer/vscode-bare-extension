const vscode = require('vscode');
const metadata = require('./package.json');
const net = require('net');

module.exports.activate = async function () {
  // Fire and forget the information message (it is not interactive)
  vscode.window.showInformationMessage(`${metadata.name} ${metadata.version}`);

  // Tell the runner to kill VS Code once the extension is done
  const client = net.createConnection(6789);
  client.on('connect', () => client.write(`👌${process.ppid}`));
}
