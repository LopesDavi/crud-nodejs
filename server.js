import {fastify} from 'fastify';
import { DatabaseMemory } from './database-memory.js';


const server = fastify();

const database = new DatabaseMemory();

//Ao utilizar métodos HTTP, podemos colocar rotas iguais para métodos diferentes

//Ao utilizar POST e PUT, é possível enviar um 'corpo' para requisição (onde enviamos os dados de um form), isso é chamado de Request Body

//Route POST - Create video
server.post('/videos', (request, reply) => {

  const {title, duration, description} = request.body;

  database.create({
    title: title,
    description: description,
    duration: duration,
  });

  return reply.status(201).send();
})

//Route GET - View video
server.get('/videos', () => {
  const videos =  database.list();

  return videos;
})

//Route PUT - Update video
/*Quando vamos atualizar um vídeo, precisamos passar um parâmetro na rota 
(Route Paramater) para identificar esse vídeo (id)*/
server.put('/videos/:id', (request, reply) => {
  //Para pegar esse id, tenho que requerer do route params o id
  const videoId = request.params.id;

  const {title, duration, description} = request.body;

  database.update(videoId, {
    title,
    duration,
    description,
  });

  return reply.status(204).send();
})

//Route DELETE - Delete video
/*Quando vamos deletar um vídeo, precisamos passar um parâmetro na rota 
(Route Paramater) para identificar esse vídeo (id)*/
server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
})

server.listen({
  port: 3333,
})
