//Arquivo responsável por criar DB em memória
import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  //Método responsável por listar todos os vídeos
  list(search) {
    //Converter para um array de dados e mapear esse array e pegar o id e as demais informações
    return Array.from(this.#videos.entries()).map((videoArray) => {
      const id = videoArray[0];
      const data = videoArray[1];

      return {
        id,
        ...data,
      };
    }).filter(video => {
      //Se eu tiver uma busca
      if(search){
        //quero retornar somente os vídeos em que o título inclui a palavra que foi escrita dentro de search
        return video.title.includes(search)
      }
      //se não tiver uma busca, retorna todos os vídeos
      return true
    })
    
  }

  //Método responsável por receber o vídeo e salvar dentro dos #videos
  create(video) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  //Método responsável por receber o id do vídeo e salvar dentro dos #videos
  update(id, video) {
    this.#videos.set(id, video);
  }

  //Método responsável por deletar o vídeo através do id e salvar dentro dos #videos
  delete(id) {
    this.#videos.delete(id);
  }
}
