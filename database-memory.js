//Arquivo responsável por criar DB em memória
import { randomUUID } from 'node:crypto';

export class DatabaseMemory {
  #videos = new Map();

  //Método responsável por listar todos os vídeos
  list() {
    return this.#videos.values();
  }


  //Método responsável por receber o vídeo e salvar dentro dos #videos
  create(video){
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  //Método responsável por receber o id do vídeo e salvar dentro dos #videos
  update(id, video){
    this.#videos.set(id, video);
  }

  //Método responsável por deletar o vídeo através do id e salvar dentro dos #videos
  delete(id){
    this.#videos.delete(id);
  }

}