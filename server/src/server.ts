import {Config} from './etc/config';
import {createServer, Server} from 'http';
import {app} from './app';

const server: Server = createServer(app);

server.listen(Config.server.port);
server.on('listening', () => {
    console.log(`Listening on port ${Config.server.port}...`);
});
