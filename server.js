import {fastify} from 'fastify';
import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';


const server = fastify();

//const database = new DatabaseMemory();
const database = new DatabasePostgres();

//Ao utilizar métodos HTTP, podemos colocar rotas iguais para métodos diferentes

//Ao utilizar POST e PUT, é possível enviar um 'corpo' para requisição (onde enviamos os dados de um form), isso é chamado de Request Body

//Utilizei um async await pois todas operações que batem no DB são assíncronas (No JS significa que é uma ação que será executada, mas leverá um tempo) e o await serve para "aguardar" essa chamada ser finalizada


//Route POST - Create video
server.post('/videos', async (request, reply) => {

  const {title, duration, description} = request.body;

  await database.create({
    title: title,
    description: description,
    duration: duration,
  });

  return reply.status(201).send();
})

//Query Params - Utilizados para identificar informações que são opcionais e filtrar dados de busca (Utilizado em rotas de listagem de dados)
//Route GET - View video
server.get('/videos', async (request) => {
  const search = request.query.search
  
  const videos =  await database.list(search);

  return videos;
})

//Route PUT - Update video
/*Quando vamos atualizar um vídeo, precisamos passar um parâmetro na rota 
(Route Paramater) para identificar esse vídeo (id)*/
server.put('/videos/:id', async (request, reply) => {
  //Para pegar esse id, tenho que requerer do route params o id
  const videoId = request.params.id;

  const {title, duration, description} = request.body;

  await database.update(videoId, {
    title,
    duration,
    description,
  });

  return reply.status(204).send();
})

//Route DELETE - Delete video
/*Quando vamos deletar um vídeo, precisamos passar um parâmetro na rota 
(Route Paramater) para identificar esse vídeo (id)*/
server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
})

server.listen({
  port: process.env.PORT ?? 3333,
})
