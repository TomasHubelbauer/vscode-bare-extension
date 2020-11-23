import child_process from 'child_process';
import net from 'net';

void function () {
  child_process.exec(`code --extensions-dir ${process.cwd()}`, { timeout: 10_000 });

  // Create an extension IPC server (Windows: named pipes, Unix: domain sockets)
  const server = net.createServer(socket => {
    socket.on('data', data => {
      const regex = /^👌(?<pid>\d+)$/;
      const match = regex.exec(data);
      if (!match) {
        return;
      }

      // Kill VS Code once we receive the completion signal from the extension
      process.kill(match.groups.pid, 'SIGINT');
      socket.end();
      server.close();

      console.log('Killed', match.groups.pid);
    });
  });

  // Listen for extension completion signal on a well-known port
  server.listen(6789);
}()
