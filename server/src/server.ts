import {createServer, Server} from 'http';
import {app} from './app';
import {Config} from './etc/config';

const server: Server = createServer(app);

server.listen(Config.server.port);
console.log(`Listening on port ${Config.server.port}...`);
