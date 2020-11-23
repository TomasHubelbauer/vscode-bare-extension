import child_process from 'child_process';

void function () {
  child_process.exec(`code --extensions-dir ${process.cwd()} --verbose --wait`, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }

    console.log(stdout);
    console.log(stderr);
  });
}()
