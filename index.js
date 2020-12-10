import child_process from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';
import cdp from './node-cdp-ws/index.js';

void async function () {
  const arg = path.join(os.tmpdir(), new Date().valueOf().toString());
  await fs.promises.mkdir(arg);
  await fs.promises.writeFile(path.join(arg, 'index.log'), '');

  const cp = child_process.exec(`code --extensions-dir ${process.cwd()} --verbose --wait ${arg} --inspect`);
  let send;
  async function communicate(chunk) {
    const lines = chunk.split('\n');
    for (const line of lines) {
      if (!line) {
        continue;
      }

      // TODO: Update this to use the right VS Code Electron (not Node) process
      if (line.startsWith('Debugger listening on ')) {
        const url = line.slice('Debugger listening on '.length);
        send = await cdp(url, console.log);

        // TODO: Update such that we are in Electron process with `process.mainModule.require('electron')`
        //const expression = `process.mainModule.require('electron').webContents.getAllWebContents().find(wc => wc.browserWindowOptions.show !== false).webContents.capturePage().then(nativeImage => nativeImage.toDataURL())`;
        const expression = `new Date().toISOString()`;
        send({ id: 1, method: 'Runtime.evaluate', params: { expression, awaitPromise: true } });
        continue;
      }

      if (line === 'For help, see: https://nodejs.org/en/docs/inspector') {
        continue;
      }

      if (line === 'Debugger attached.') {
        continue;
      }

      if (line === 'Waiting for the debugger to disconnect...') {
        // TODO: Send CDP debugger detach instruction
        continue;
      }

      if (line.startsWith('Marker file for --wait created: ')) {
        continue;
      }

      console.log(line);
    }
  }

  cp.stdout.on('data', communicate);
  cp.stderr.on('data', communicate);
}()
