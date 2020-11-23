import child_process from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

void async function () {
  let arg = process.argv[2];
  if (!arg) {
    arg = path.join(os.tmpdir(), new Date().valueOf().toString());
    await fs.promises.mkdir(arg);
    await fs.promises.writeFile(path.join(arg, 'index.log'), '');
  }

  console.log(arg);
  child_process.exec(`code --extensions-dir ${process.cwd()} --verbose --wait ${arg}`, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }

    console.log(stdout);
    console.log(stderr);
  });
}()
