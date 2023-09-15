import {fastify} from 'fastify';
import { DatabaseMemory } from './database-memory.js';


const server = fastify();

const database = new DatabaseMemory();

//Ao utilizar métodos HTTP, podemos colocar rotas iguais para métodos diferentes

//Route POST - Create video
server.post('/videos', () => {
  return "Hello word!";
})

//Route GET - View video
server.post('/videos', () => {
  return "Hello word!";
})

//Route PUT - Update video
/*Quando vamos atualizar um vídeo, precisamos passar um parâmetro na rota 
(Route Paramater) para identificar esse vídeo (id)*/
server.put('/videos/:id', () => {
  return "Hello word!";
})

//Route DELETE - Delete video
/*Quando vamos deletar um vídeo, precisamos passar um parâmetro na rota 
(Route Paramater) para identificar esse vídeo (id)*/
server.delete('/videos/:id', () => {
  return "Hello word!";
})

server.listen({
  port: 3333,
})
