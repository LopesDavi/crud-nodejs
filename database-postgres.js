//Arquivo responsável por criar DB com postgres
import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {

  //Método responsável por listar todos os vídeos
  async list(search) {
    //Utilizei um async await pois todas operações que batem no DB são assíncronas (No JS significa que é uma ação que será executada, mas leverá um tempo) e o await serve para "aguardar" essa chamada ser finalizada
    let videos
    //Se eu tiver uma busca
    if (search) {
      //A operação será com filtro
      //Selecione todas colunas da tabela videos onde o titulo tem tal palavra
      videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
    } else {
      //Retorna todos os videos
      videos = await sql`select * from videos`
    }
    return videos;
  }

  //Método responsável por receber o vídeo e salvar dentro dos #videos
  async create(video) {
     const videoId = randomUUID();
     const {title, description, duration} = video;

     await sql `insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
  }

  //Método responsável por receber o id do vídeo e salvar dentro dos #videos
  async update(id, video) {
    const { title,  description, duration } = video;

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
  }

  //Método responsável por deletar o vídeo através do id e salvar dentro dos #videos
  async delete(id) {
    await sql`delete from videos where id = ${id}`
  }
}
