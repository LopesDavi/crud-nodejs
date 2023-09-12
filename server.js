import {fastify} from 'fastify';

const server = fastify();

server.get('/', () => {
  return "Hello word!";
})

server.listen({
  port: 3333,
})