import {createServer, Server} from 'http';
import {app} from './app';

const PORT: Number = Number(process.env.PORT) || 3000;
const server: Server = createServer(app);

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);
